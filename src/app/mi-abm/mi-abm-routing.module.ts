import { MiabmformComponent } from './components/miabmform/miabmform/miabmform.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiabmlistComponent } from './components/miabmlist/miabmlist.component';

const routes: Routes = [
  {
    path: '',
    component: MiabmlistComponent,
  },
  { path: ':id/:mode', component: MiabmformComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MiABMRoutingModule {}
