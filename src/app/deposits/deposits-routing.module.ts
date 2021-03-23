
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDepositComponent } from './components/form-deposit/form-deposit.component';
import { ListDepositsComponent } from './components/list-deposits/list-deposits.component';


const routes: Routes = [
  {
    path: '',
    component: ListDepositsComponent,
  },
  { path: ':guid/:mode', component: FormDepositComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepositsRoutingModule {}
