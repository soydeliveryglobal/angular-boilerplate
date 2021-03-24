import { HttpClient } from '@angular/common/http';
import { ProductsModalComponent } from './../componentes-hijos/products-modal/products-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../material/material.module';
import { DatePickerComponent } from './../componentes-hijos/date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function productsModalHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    DatePickerComponent,
    ProductsModalComponent
  ],
  exports: [
    DatePickerComponent,
    ProductsModalComponent
  ],
  imports: [
    CommonModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: productsModalHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers:[FormsModule]
  
})
export class NavigationModule { }
