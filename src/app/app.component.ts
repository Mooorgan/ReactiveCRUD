import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductService } from './services/product/product.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(private products: ProductService) {}
  ngOnInit(): void {}
}
