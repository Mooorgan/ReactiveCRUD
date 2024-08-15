import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavigationBarModule } from 'src/modules/navigation-bar/navigation-bar.module';
import { SearchModule } from 'src/modules/search/search.module';
import { ButtonsModule } from 'src/modules/buttons/buttons.module';
import { ValidationMessageModule } from 'src/modules/validation-message/validation-message.module';
import { HightlightDirective } from './directives/hightlight.directive';
import { CurrencyFormatPipe } from './pipes/currency-custom.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductSearchComponent,
    HightlightDirective,
    CurrencyFormatPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NavigationBarModule,
    SearchModule,
    ButtonsModule,
    ValidationMessageModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
