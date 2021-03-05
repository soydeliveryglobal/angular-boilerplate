
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormLineComponent } from './components/form-line/form-line.component';
import { ListaLinesComponent } from './components/lista-lines/lista-lines.component';

const routes: Routes = [
  {
    path: '',
    component: ListaLinesComponent,
  },
  { path: ':guid/:mode', component: FormLineComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinesRoutingModule {}
