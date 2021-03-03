import { ListaProviderComponent } from './components/lista-tarifas/lista-provider.component';
import { FormTarifaComponent } from './components/form-tarifa/form-tarifa.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaProviderComponent,
  },
  { path: ':id/:mode', component: FormTarifaComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
