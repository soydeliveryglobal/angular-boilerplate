import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { MiABMRoutingModule } from './mi-abm-routing.module';
import { MiabmlistComponent } from './components/miabmlist/miabmlist.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MiabmformComponent } from './components/miabmform/miabmform/miabmform.component'

@NgModule({
  declarations: [MiabmlistComponent, MiabmformComponent],
  imports: [
    CommonModule,
    MiABMRoutingModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MiABMModule { }
