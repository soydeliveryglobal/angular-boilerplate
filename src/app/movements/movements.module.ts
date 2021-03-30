import { MatFormFieldModule } from '@angular/material/form-field';
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
import { MatSelectModule } from '@angular/material/select';
import { MovementsRoutingModule } from './movements-routing.module';
import { ListMovementsComponent } from './components/list-users/list-movements.component';
import { FormMovementComponent } from './components/form-user/form-movement.component';



export function movementsHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/', '.json');
}



@NgModule({
  declarations: [ListMovementsComponent,FormMovementComponent],
  imports: [
    CommonModule,
    MovementsRoutingModule,
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
        useFactory: movementsHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ]
})
export class MovementsModule { }
