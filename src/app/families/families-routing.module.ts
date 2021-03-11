import { FormFamilyComponent } from './components/form-family/form-family.component';
import { ListFamiliesComponent } from './components/list-families/list-families.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListFamiliesComponent,
  },
  { path: ':guid/:mode', component: FormFamilyComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FamiliesRoutingModule {}
