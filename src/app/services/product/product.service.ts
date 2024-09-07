import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ResponseProductLists } from 'src/types-and-interfaces/products/http-response.products.type';
import {
  Observable,
  Subject,
  concatMap,
  debounceTime,
  distinctUntilChanged,
  filter,
  from,
  map,
  merge,
  scan,
  share,
  shareReplay,
  switchMap,
  take,
  tap,
} from 'rxjs';
import {
  Product,
  ProductId,
} from 'src/types-and-interfaces/products/products.type';
import { addHandler, deleteHandler, editHandler } from './product.state.helper';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly loadAllProducts$ = this.http
    .get<ResponseProductLists>(`/assets/products.json`)
    .pipe(
      map((pr) => pr.products),
      concatMap((products) => from(products)),

      shareReplay({ refCount: false })
    );

  readonly filterSubj = new Subject<string>();
  protected readonly filter$ = this.filterSubj.asObservable();

  readonly filteredSearch$ = this.filter$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((word) => {
      return this.productsCalculations$.pipe(
        // take(1),
        map((products) => {
          const filteredArray: Product[] = [];
          for (const p of products) {
            const regex = new RegExp(`${word}`, 'gi');
            if (regex.test(p.name)) {
              filteredArray.push(p);
            }
          }

          return filteredArray;
        })
      );
    })
  );

  private readonly addProductSubj = new Subject<Product>();
  readonly addProduct$ = this.addProductSubj.asObservable();

  addProduct(product: Product) {
    this.addProductSubj.next(product);
  }

  private readonly editProductSubj = new Subject<Product>();
  readonly editProduct$ = this.editProductSubj.asObservable();

  editProduct(product: Product) {
    this.editProductSubj.next(product);
  }

  private readonly deleteProductSubj = new Subject<ProductId>();
  readonly deleteProduct$ = this.deleteProductSubj.asObservable();

  deleteProduct(product: ProductId) {
    this.deleteProductSubj.next(product);
  }

  readonly productsCalculations$: Observable<Product[]> = merge(
    this.loadAllProducts$.pipe(
      tap((d) => {
        console.log(d);
      }),
      map(addHandler),
      tap((d) => {
        console.log(d);
      })
    ),
    this.addProduct$.pipe(map(addHandler)),
    this.editProduct$.pipe(map(editHandler)),
    this.deleteProduct$.pipe(map(deleteHandler))
  ).pipe(
    scan<(p: Product[]) => Product[], Product[]>(
      (products: Product[], stateHandlerFn) => stateHandlerFn(products),
      []
    ),
    tap((d) => {
      console.log(d);
    }),
    shareReplay({
      bufferSize: 1,
      refCount: false,
    })
  );

  readonly products$ = merge(
    this.productsCalculations$,
    this.filteredSearch$
  ).pipe();

  constructor(private http: HttpClient) {}

  loadAllProducts() {
    return this.http.get<ResponseProductLists>(`/assets/products.json`);
  }
}
