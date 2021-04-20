import { ListTypeOfDocumentComponent } from './components/list-typeOfDocument/list-typeOfDocument.component';
import { FormTypeOfDocumentComponent } from './components/form-typeOfDocument/form-typeOfDocument.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListTypeOfDocumentComponent,
  },
  { path: ':guid/:mode', component: FormTypeOfDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TypeOfDocumentRoutingModule {}
