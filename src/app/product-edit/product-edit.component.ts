import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';
import { v1 as uuidV1 } from 'uuid';
import { FormBuilder, Validators } from '@angular/forms';

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
  ) {}

  protected productForm = this.fb.group({
    name: [null, [Validators.required]],
    description: [null, [Validators.required]],
    price: [null, [Validators.required]],
  });

  ngOnInit(): void {
    console.log(uuidV1());
    this.ar.url
      .pipe(
        takeUntil(this.destroy$),
        tap((d) => {
          this.pageLabel = d[d.length - 1].path === 'add' ? 'Add' : 'Edit';
        }),
      )
      .subscribe();
  }
  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
  submit() {
    console.log(this.productForm);
    if (!this.productForm.valid) {
      return;
    }
  }
}
