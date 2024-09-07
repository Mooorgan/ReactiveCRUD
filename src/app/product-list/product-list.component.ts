import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent implements OnInit {
  protected products$ = this.products.products$;

  constructor(
    private products: ProductService,
    private router: Router,
    private ar: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  editProduct(id: string) {
    this.router.navigate([id, 'edit'], { relativeTo: this.ar });
  }

  deleteProduct(id: string) {
    this.products.deleteProduct(id);
  }

  navigateToProductDetails(id: string) {
    this.router.navigate([id], { relativeTo: this.ar });
  }

  handleSearch(e: string) {
    this.products.filterSubj.next(e);
  }
}
