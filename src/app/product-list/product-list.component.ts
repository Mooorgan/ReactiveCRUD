import { Component } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent {
  protected products$ = this.products.loadAllProducts();

  constructor(
    private products: ProductService,
    private router: Router,
    private ar: ActivatedRoute,
  ) {}

  editProduct(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.ar });
  }

  deleteProduct(id: string) {}

  navigateToProductDetails(id: string) {
    this.router.navigate([id], { relativeTo: this.ar });
  }
}
