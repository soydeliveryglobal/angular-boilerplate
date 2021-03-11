import { FormProductComponent } from './components/form-product/form-product.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/list-products/list-products.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductsComponent,
  },
  { path: ':guid/:mode', component: FormProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
