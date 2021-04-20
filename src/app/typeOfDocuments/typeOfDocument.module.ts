import { ListTypeOfDocumentComponent } from './components/list-typeOfDocument/list-typeOfDocument.component';
import { FormTypeOfDocumentComponent } from './components/form-typeOfDocument/form-typeOfDocument.component';

import { MatSortModule } from '@angular/material/sort';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TypeOfDocumentRoutingModule } from './typeofdocument-routing.module';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NavigationModule } from './../navigation/navigation/navigation.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatPaginatorModule } from '@angular/material/paginator';



export function demoHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}



@NgModule({
  declarations: [ListTypeOfDocumentComponent, FormTypeOfDocumentComponent],
  imports: [
    CommonModule,
    TypeOfDocumentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavigationModule,
    NbCardModule,
    NbIconModule,
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: demoHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ]
})
export class TypeOfDocumentModule { }
