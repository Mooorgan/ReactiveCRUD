import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss'],
})
export class ProductEditComponent {
  constructor(
    private ar: ActivatedRoute,
    private router: Router,
  ) {}
  navigateBack() {
    this.router.navigate(['.'], { relativeTo: this.ar.parent });
  }
  submit() {}
}
