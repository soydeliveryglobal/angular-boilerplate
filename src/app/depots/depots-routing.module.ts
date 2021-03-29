
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDepotComponent } from './components/form-depot/form-depot.component';
import { ListDepotsComponent } from './components/list-depots/list-depots.component';


const routes: Routes = [
  {
    path: '',
    component: ListDepotsComponent,
  },
  { path: ':guid/:mode', component: FormDepotComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotsRoutingModule {}
