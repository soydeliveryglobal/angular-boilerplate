import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../../shared/shared.module';
import { MaterialModule } from './../../material/material.module';
import { DatePickerComponent } from './../componentes-hijos/date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    DatePickerComponent,
  ],
  exports: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers:[FormsModule]
  
})
export class NavigationModule { }
