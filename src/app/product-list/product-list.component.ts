import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { Observable, Subject, map, merge, switchMap, tap } from 'rxjs';
import { Product } from 'src/types-and-interfaces/products/products.type';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  protected products$ = merge(
    this.products.finalProducts$.pipe(
      tap((r) => {
        console.log(r);
      }),
    ),
    this.products.filteredSearch$,
  );

  constructor(
    private products: ProductService,
    private router: Router,
    private ar: ActivatedRoute,
  ) {}
  ngAfterViewInit(): void {
    // this.products.addProduct({
    //   description: 'sdfsdaf',
    //   id: 'kk',
    //   name: 'sdfjsldkfj',
    //   price: 3200,
    // });
  }
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
