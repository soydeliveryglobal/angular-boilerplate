import { DatePickerComponent } from './navigation/componentes-hijos/date-picker/date-picker.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
  NbIconModule,
  NbSelectModule
} from '@nebular/theme';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from './shared/shared.module';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { PopUpsComponent } from './navigation/componentes-hijos/pop-ups-category/pop-ups.component';
import { PopUpMarcasComponent } from './navigation/componentes-hijos/pop-up-marcas/pop-up-marcas.component';
import { PopUpFamilyComponent } from './navigation/componentes-hijos/pop-up-family/pop-up-family.component';
import { PopUpLinesComponent } from './navigation/componentes-hijos/pop-up-lines/pop-up-lines.component';
import { PopUpVarietiesComponent } from './navigation/componentes-hijos/pop-up-varieties/pop-up-varieties.component';
import { PopUpProviderComponent } from './navigation/componentes-hijos/pop-up-provider/pop-up-provider.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    PopUpsComponent,
    PopUpMarcasComponent,
    PopUpFamilyComponent,
    PopUpLinesComponent,
    PopUpVarietiesComponent,
    PopUpProviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbChatModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbIconModule,
    NbSelectModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NgbModule,
    SharedModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      isolate: true,
    }),
    CoreModule,
    HttpClientModule,
  ],
  providers: [HttpClientModule,Ng2SmartTableModule, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
  bootstrap: [AppComponent],
})
export class AppModule { }
