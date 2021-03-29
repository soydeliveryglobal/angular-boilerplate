import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSortModule } from '@angular/material/sort';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { NbCardModule, NbIconModule, NbInputModule } from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NavigationModule } from './../navigation/navigation/navigation.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { ListDepotsComponent } from './components/list-depots/list-depots.component';
import { FormDepotComponent } from './components/form-depot/form-depot.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepotsRoutingModule } from './depots-routing.module';



export function depotsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}



@NgModule({
  declarations: [ListDepotsComponent, FormDepotComponent],
  imports: [
    CommonModule,
    DepotsRoutingModule,
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
        useFactory: depotsHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ]
})
export class DepotsModule { }
