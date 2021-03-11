import { FormVarietyComponent } from './components/form-variety/form-variety.component';
import { ListaVarietiesComponent } from './components/lista-varieties/lista-varieties.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaVarietiesComponent,
  },
  { path: ':guid/:mode', component: FormVarietyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VarietiesRoutingModule {}
