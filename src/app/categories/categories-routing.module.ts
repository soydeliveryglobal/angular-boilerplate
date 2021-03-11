import { FormCategoryComponent } from './components/form-category/form-category.component';
import { ListCategoriesComponent } from './components/list-categories/list-categories.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListCategoriesComponent,
  },
  { path: ':guid/:mode', component: FormCategoryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
