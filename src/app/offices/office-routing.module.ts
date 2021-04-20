import { ListOfficeComponent } from './components/list-office/list-office.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormOfficeComponent } from './components/form-office/form-office.component';

const routes: Routes = [
  {
    path: '',
    component: ListOfficeComponent,
  },
  { path: ':guid/:mode', component: FormOfficeComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OfficeRoutingModule {}
