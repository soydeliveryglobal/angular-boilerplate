import { ListaProviderComponent } from './components/lista-provider/lista-provider.component';
import { FormProviderComponent } from './components/form-provider/form-provider.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaProviderComponent,
  },
  { path: ':guid/:mode', component: FormProviderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProviderRoutingModule {}
