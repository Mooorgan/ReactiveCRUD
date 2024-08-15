import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseProductLists } from 'src/types-and-interfaces/products/http-response.products.type';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // private readonly allProductsSubj = new Subject<void>();
  // public readonly allProducts$ = this.allProductsSubj.asObservable();

  constructor(private http: HttpClient) {}

  loadAllProducts() {
    // this.allProductsSubj.next();
    return this.http.get<ResponseProductLists>(`/assets/products.json`);
  }
}
