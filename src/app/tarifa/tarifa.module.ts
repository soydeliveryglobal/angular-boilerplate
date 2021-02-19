import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { NavigationModule } from './../navigation/navigation/navigation.module';
import { SharedModule } from './../shared/shared.module';
import { ListaTarifaComponent } from './components/lista-tarifas/lista-tarifa.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TarifaRoutingModule } from './tarifa-routing.module';
import { FormTarifaComponent } from './components/form-tarifa/form-tarifa.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function demoHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n/tarifa/', '.json');
}

@NgModule({
  declarations: [ListaTarifaComponent,FormTarifaComponent],
  imports: [
    CommonModule,
    TarifaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NavigationModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: demoHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    
  ]
})
export class TarifaModule { }
