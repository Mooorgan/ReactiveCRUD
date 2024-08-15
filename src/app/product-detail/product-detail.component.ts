import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, takeUntil } from 'rxjs';
import { SubjectDestroyService } from '../services/subject-destroy/subject-destroy.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [SubjectDestroyService],
})
export class ProductDetailComponent {
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
    private destroy$: SubjectDestroyService,
  ) {
    this.ar.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params) => params.get('id')),
      )
      .subscribe((id) => {
        console.log(id);
      });
  }

  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
