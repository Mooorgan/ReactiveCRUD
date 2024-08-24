import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concatMap, filter, map, takeUntil, tap } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { v1 as uuidV1 } from 'uuid';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
  providers: [SubjectDestroyService],
})
export class ProductEditComponent implements OnInit {
  protected pageLabel: 'Add' | 'Edit' = 'Add';
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private destroy$: SubjectDestroyService,
    private fb: FormBuilder,
    private products: ProductService
  ) {}

  protected productForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
    id: [null],
  });

  ngOnInit(): void {
    this.ar.url
      .pipe(
        takeUntil(this.destroy$),
        tap((d) => {
          this.pageLabel = d[d.length - 1].path === 'add' ? 'Add' : 'Edit';
          if (this.pageLabel === 'Add') {
            //@ts-ignore
            this.productForm.controls.id.setValue(uuidV1());
          }
        })
      )
      .subscribe();

    this.ar.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((p) => {
          return p.get('id');
        }),
        tap((id) => {
          if (id) {
            //@ts-ignore
            this.productForm.controls.id.setValue(id);
          }
        }),
        concatMap((targetId) => {
          return this.products.products$.pipe(
            map((products) => {
              const filtered = products.filter((p) => {
                return p.id === targetId;
              });
              return filtered;
            })
          );
        })
      )
      .subscribe((filteredProduct) => {
        if (filteredProduct.length) {
          //@ts-ignore
          this.productForm.setValue(filteredProduct[0]);
        }
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
      //@ts-ignore
      this.products.addProduct(this.productForm.value);
    } else {
      //@ts-ignore
      this.products.editProduct(this.productForm.value);
    }
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
