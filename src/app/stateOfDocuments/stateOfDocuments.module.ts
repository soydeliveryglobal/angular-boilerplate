import { FormStateOfDocumentComponent } from './components/form-stateofdocument/form-stateofdocument.component';
import { ListStateOfDocumentsComponent } from './components/list-stateofdocuments/list-stateofdocuments.component';
import { StateOfDocumentsRoutingModule } from './stateOfDocuments-routing.module';
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



export function stateofdocumentsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}



@NgModule({
  declarations: [ListStateOfDocumentsComponent, FormStateOfDocumentComponent],
  imports: [
    CommonModule,
    StateOfDocumentsRoutingModule,
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
        useFactory: stateofdocumentsHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ]
})
export class StateOfDocumentsModule { }
