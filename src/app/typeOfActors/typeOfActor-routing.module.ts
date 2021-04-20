import { ListTypeOfActorComponent } from './components/list-typeOfActor/list-typeOfActor.component';
import { FormTypeOfActorComponent } from './components/form-typeOfActor/form-typeOfActor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListTypeOfActorComponent,
  },
  { path: ':guid/:mode', component: FormTypeOfActorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeOfActorRoutingModule {}
