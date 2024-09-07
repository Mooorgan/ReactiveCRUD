import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil, tap } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { v1 as uuidV1 } from 'uuid';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product/product.service';
import { Product } from 'src/types-and-interfaces/products/products.type';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [SubjectDestroyService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductEditComponent implements OnInit {
  protected pageLabel: 'Add' | 'Edit' = 'Add';
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private destroy$: SubjectDestroyService,
    private fb: FormBuilder,
    private products: ProductService,
    private cdr: ChangeDetectorRef
  ) {}

  protected productForm = this.fb.group({
    name: [null as string | null, [Validators.required]],
    description: [null as string | null, [Validators.required]],
    price: [null as number | null, [Validators.required]],
    id: [null as string | null, [Validators.required]],
  });

  ngOnInit(): void {
    this.ar.url
      .pipe(
        takeUntil(this.destroy$),
        tap((d) => {
          this.pageLabel = d[d.length - 1].path === 'add' ? 'Add' : 'Edit';
          if (this.pageLabel === 'Add') {
            this.productForm.controls.id.setValue(uuidV1());
          }
        })
      )
      .subscribe(() => {
        // this.cdr.markForCheck();
      });

    this.ar.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((p) => {
          return p.get('id');
        }),
        tap((id) => {
          if (id) {
            this.productForm.controls.id.setValue(id);
          }
        }),
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
        tap((filteredProduct) => {
          if (filteredProduct.length) {
            this.productForm.setValue(filteredProduct[0]);
          }
        })
      )
      .subscribe(() => {
        // this.cdr.markForCheck();
      });
  }
  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
  submit() {
    if (!this.productForm.valid) {
      return;
    }

    if (this.pageLabel === 'Add') {
      this.products.addProduct(this.productForm.value as Product);
    } else {
      this.products.editProduct(this.productForm.value as Product);
    }
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
