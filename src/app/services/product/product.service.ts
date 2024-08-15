import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ResponseProductLists } from 'src/types-and-interfaces/products/http-response.products.type';
import {
  BehaviorSubject,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  scan,
  shareReplay,
  switchMap,
  tap,
} from 'rxjs';
import {
  Product,
  ProductId,
} from 'src/types-and-interfaces/products/products.type';
import { addHandler, deleteHandler, editHandler } from './product.state.helper';

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'Yamaha F280 Acoustic Rosewood Guitar',
    description:
      'Yamaha Acoustic guitars are a testimony to the long-lasting legacy of handcrafted guitars that give people a platform to make waves. They are affordable, reliable and most of all; desirable.',
    price: 7300,
  },
  {
    id: '2',
    name: 'AGARO Marvel 9L Oven',
    description:
      'An oven is a tool to cook food using heat in a controlled way. Radiant heat is of many types, such as open fire, gas fire, electric heating, and radiation energy. Ovens cook different types of food faster than the conventional methods.',
    price: 4200,
  },
  {
    id: '3',
    name: 'Dell-SE2722H FHD Monitor',
    description:
      'Sturdy and Compact: Free up your workspace and regain your desk real estate with this small-footprint monitor. A built-in power supply unit and cable holder help to further reduce clutter.',
    price: 10200,
  },
  {
    id: '4',
    name: 'AGARO Imperial Espresso Coffee Maker',
    description:
      '15 Bars High pressure with 1100 watts provide fast and stable extraction of espresso rich in cream. Analogue dial thermometer lets you to control the temperature for optimal coffee extraction. 2 Separate thermostats adjust the temperature of water and milk foam separately to create great taste of coffee and to create rich and creamy milk foam. Allows you to adjust the foam and steam levels to customize a variety of delicious espresso-based coffee. Movable stainless steel frothing wand for convenient use',
    price: 16200,
  },
];

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly finalProductsSubj = new BehaviorSubject<Product[] | null>(
    null,
  );
  readonly finalProducts$ = this.finalProductsSubj
    .asObservable()
    .pipe(filter(Boolean));

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

  readonly products$ = merge(
    this.addProduct$.pipe(
      map(addHandler),
      tap((c) => {
        console.log(c);
      }),
    ),
    this.editProduct$.pipe(map(editHandler)),
    this.deleteProduct$.pipe(map(deleteHandler)),
  )
    .pipe(
      scan(
        (products: Product[], stateHandlerFn) => stateHandlerFn(products),
        [],
      ),
      shareReplay(1),
    )
    .subscribe((p: Product[]) => {
      this.finalProductsSubj.next(p);
    });

  constructor(private http: HttpClient) {}

  loadAllProducts() {
    return this.http.get<ResponseProductLists>(`/assets/products.json`);
  }

  readonly filterSubj = new Subject<string>();
  protected readonly filter$ = this.filterSubj.asObservable();

  readonly filteredSearch$ = this.filter$.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    switchMap((word) => {
      return this.finalProducts$.pipe(
        map((products) => {
          const regex = new RegExp(`${word}`, 'gi');
          const filteredArray: any[] = [];
          for (const p of products) {
            if (regex.test(p.name)) {
              filteredArray.push(p);
            }
          }
          //
          return filteredArray;
        }),
      );
    }),
  );
  // .subscribe((d) => {
  //   this.finalFilterSubj.next(d);
  // });
}
