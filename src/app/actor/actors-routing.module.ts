import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormActorComponent } from './components/form-user/form-actor.component';
import { ListActorsComponent } from './components/list-users/list-actors.component';


const routes: Routes = [
  {
    path: '',
    component: ListActorsComponent,
  },
  { path: ':guid/:mode', component: FormActorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActorsRoutingModule {}
