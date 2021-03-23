import { FormUnitComponent } from './components/form-unit/form-unit.component';
import { ListUnitsComponent } from './components/list-units/list-units.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListUnitsComponent,
  },
  { path: ':guid/:mode', component: FormUnitComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule {}
