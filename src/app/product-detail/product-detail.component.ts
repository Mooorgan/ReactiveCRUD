import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
  ) {}
  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
}
