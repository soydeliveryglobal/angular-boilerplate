import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Tarifa } from './../../../core/models/tarifa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/util';
import { environment } from 'src/environments/environment';
import { TarifaService } from 'src/app/core/services/tarifa.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'lista-tarifa',
  templateUrl: './lista-tarifa.template.html',
  styleUrls: ['./lista-tarifa.scss'],
})
export class ListaTarifaComponent implements OnInit {
  tarifas: Tarifa[];
  environment = environment;
  Util = Util;

  ngOnInit() {
    this.consultar();
  }

  private consultar() {
    this.tarifaService.getAll().subscribe((tarifa: Tarifa[]) => {
      this.tarifas = tarifa;
    });
  }

  constructor(
    private tarifaService: TarifaService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });
  }

  nuevoAdministrador(p: Tarifa) {
    this.tarifas.push(p);
  }

  deleteAdministrador(id: number) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_TARIFA,
      id,
      environment.MODO_DELETE,
    ]);
  }

  updateAdministrador(id: number) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_TARIFA,
      id,
      environment.MODO_UPDATE,
    ]);
  }

  administradorDetails(id: number) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_TARIFA,
      id,
      environment.MODO_DISPLAY,
    ]);
  }

  createAdministrador() {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_TARIFA,
      0,
      environment.MODO_CREATE,
    ]);
  }
}
