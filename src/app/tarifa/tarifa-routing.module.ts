import { FormTarifaComponent } from './components/form-tarifa/form-tarifa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaTarifaComponent } from './components/lista-tarifas/lista-tarifa.component';

const routes: Routes = [
  {
    path: '',
    component: ListaTarifaComponent,
  },
  { path: ':id/:mode', component: FormTarifaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TarifaRoutingModule {}
