import { ListStateOfActorComponent } from './components/list-stateOfActor/list-stateOfActor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormStateOfActorComponent } from './components/form-stateOfActor/form-stateOfActor.component';

const routes: Routes = [
  {
    path: '',
    component: ListStateOfActorComponent,
  },
  { path: ':guid/:mode', component: FormStateOfActorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateOfActorRoutingModule {}
