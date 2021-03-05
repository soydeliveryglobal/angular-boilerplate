import { FormProfileComponent } from './components/form-profile/form-profile.component';
import { ListaProfileComponent } from './components/lista-profile/lista-profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaProfileComponent,
  },
  { path: ':guid/:mode', component: FormProfileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
