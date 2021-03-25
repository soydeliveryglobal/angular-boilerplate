
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMovementComponent } from './components/form-user/form-movement.component';
import { ListMovementsComponent } from './components/list-users/list-movements.component';


const routes: Routes = [
  {
    path: '',
    component: ListMovementsComponent,
  },
  { path: ':guid/:mode', component: FormMovementComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementsRoutingModule {}
