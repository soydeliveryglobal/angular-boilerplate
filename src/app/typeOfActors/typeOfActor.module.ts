import { ListTypeOfActorComponent } from './components/list-typeOfActor/list-typeOfActor.component';
import { FormTypeOfActorComponent } from './components/form-typeOfActor/form-typeOfActor.component';

import { MatSortModule } from '@angular/material/sort';

import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { TypeOfActorRoutingModule } from './typeofactor-routing.module';
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
  declarations: [ListTypeOfActorComponent, FormTypeOfActorComponent],
  imports: [
    CommonModule,
    TypeOfActorRoutingModule,
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
export class TypeOfActorModule { }
