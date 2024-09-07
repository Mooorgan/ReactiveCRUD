import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { ProductService } from '../services/product/product.service';
import { Product } from 'src/types-and-interfaces/products/products.type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [SubjectDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  protected product!: Product;
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private destroy$: SubjectDestroyService,
    private products: ProductService,
    private cdr: ChangeDetectorRef
  ) {
    this.ar.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
        switchMap((targetId) => {
          return this.products.products$.pipe(
            map((products) => {
              const filtered = products.filter((p) => {
                return p.id === targetId;
              });
              return filtered;
            })
          );
        }),
        tap((product) => {
          this.product = product[0];
        })
      )
      .subscribe(() => {
        this.cdr.markForCheck();
      });
  }

  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
