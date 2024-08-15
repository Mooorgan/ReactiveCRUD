import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  editProduct(id: number) {
    this.router.navigate([id, 'edit'], { relativeTo: this.ar });
  }

  deleteProduct(id: number) {}
}
