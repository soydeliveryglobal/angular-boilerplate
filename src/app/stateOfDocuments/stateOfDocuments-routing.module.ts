import { FormStateOfDocumentComponent } from './components/form-stateofdocument/form-stateofdocument.component';
import { ListStateOfDocumentsComponent } from './components/list-stateofdocuments/list-stateofdocuments.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ListStateOfDocumentsComponent,
  },
  { path: ':guid/:mode', component: FormStateOfDocumentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StateOfDocumentsRoutingModule {}
