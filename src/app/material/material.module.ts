import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'
import { MatSortModule } from '@angular/material/sort';
const material = [
  MatTabsModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatListModule,
  MatMenuModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatInputModule,
  MatSelectModule
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...material
  
  ],
  exports: [
    ...material
  ]
})
export class MaterialModule { }
