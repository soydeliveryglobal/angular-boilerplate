import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {of as observableOf} from 'rxjs'

import {
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
} from '@nebular/theme';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from '../layout/components/header/header/header.component';
import { NbHeaderComponent } from './nb-header/nb-header.component';

import { NbAuthModule, NbDummyAuthStrategy } from '@nebular/auth';
import { NbSecurityModule, NbRoleProvider } from '@nebular/security';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function sharedHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/shared/', '.json');
}

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

const nebular = [
  NbActionsModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbUserModule,
  NbContextMenuModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbThemeModule,
  NbSecurityModule
 ]

@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    NbHeaderComponent
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    NbHeaderComponent,
    NbAuthModule,
  ],
  imports: [
    ...nebular,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: sharedHttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers:[FormsModule]
})
export class SharedModule { }


