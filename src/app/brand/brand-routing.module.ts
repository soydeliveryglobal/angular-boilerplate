import { ListaBrandComponent } from './components/lista-brand/lista-brand.component';
import { FormBrandComponent } from './components/form-brand/form-brand.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListaBrandComponent,
  },
  { path: ':guid/:mode', component: FormBrandComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BrandRoutingModule {}
