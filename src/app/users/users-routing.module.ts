
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormUserComponent } from './components/form-user/form-user.component';
import { ListUsersComponent } from './components/list-users/list-users.component';


const routes: Routes = [
  {
    path: '',
    component: ListUsersComponent,
  },
  { path: ':guid/:mode', component: FormUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
