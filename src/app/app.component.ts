import { Component, OnInit } from '@angular/core';
import {
  ProductService,
  initialProducts,
} from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private products: ProductService) {}
  ngOnInit(): void {
    initialProducts.forEach((p) => {
      this.products.addProduct(p);
    });
  }
}
