import { MatFormFieldModule } from '@angular/material/form-field';
import { FormProductComponent } from './components/form-product/form-product.component';
import { MatSortModule } from '@angular/material/sort';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NavigationModule } from './../navigation/navigation/navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { MatSelectModule } from '@angular/material/select';



export function productsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}



@NgModule({
  declarations: [ListProductsComponent,FormProductComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NbCardModule,
    NbIconModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatFormFieldModule,
    NavigationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: productsHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ]
})
export class ProductsModule { }
