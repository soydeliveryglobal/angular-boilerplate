import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormMovementTypeComponent } from './components/form-movementType/form-movementType.component';
import { ListaMovementTypeComponent } from './components/lista-movementtype/lista-movementtype.component';

const routes: Routes = [
  {
    path: '',
    component: ListaMovementTypeComponent,
  },
  { path: ':guid/:mode', component: FormMovementTypeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MovementTypeRoutingModule {}
