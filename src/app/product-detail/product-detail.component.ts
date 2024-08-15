import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, map, takeUntil } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { ProductService } from '../services/product/product.service';
import { Product } from 'src/types-and-interfaces/products/products.type';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [SubjectDestroyService],
})
export class ProductDetailComponent {
  protected product!: Product;
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private destroy$: SubjectDestroyService,
    private products: ProductService,
  ) {
    this.ar.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
        concatMap((targetId) => {
          return this.products.finalProducts$.pipe(
            map((products) => {
              const filtered = products.filter((p) => {
                return p.id === targetId;
              });
              return filtered;
            }),
          );
        }),
      )
      .subscribe((product) => {
        this.product = product[0];
      });
  }

  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
