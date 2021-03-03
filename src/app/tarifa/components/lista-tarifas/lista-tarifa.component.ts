import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Tarifa } from './../../../core/models/tarifa';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/util';
import { environment } from 'src/environments/environment';
import { TarifaService } from 'src/app/core/services/abm/tarifa.service';
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


  tableSettings = {};
  tableColumnHeaders: string[];
  

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
      this.setColumnheaders()
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


  setColumnheaders(): void {
    let tarifaId = 'ID';
    let tazaAdulto = 'TARIFA.COLUMN_ADULT_RATE';
    let tazaNinio = 'TARIFA.COLUMN_CHILDREN_RATE';
    let tazaBebe = 'TARIFA.COLUMN_BABY_RATE';
    let tazaJubilado = 'TARIFA.COLUMN_RETIRED_RATE';
    let fechaDeVigencia = 'TARIFA.COLUMN_EFFECTIVE_DATE';
    this.tableColumnHeaders = [tarifaId,tazaAdulto,tazaNinio,tazaBebe,tazaJubilado,fechaDeVigencia]
  
    this.translateColumns()

  }

  translateColumns():void{
    this.tableColumnHeaders.map((column,i) => {
      this.translate.get(column).subscribe(title => {
        this.tableColumnHeaders[i] = title
        if(i==this.tableColumnHeaders.length-1) {
          this.loadTableSettings()
        }
      });
    });
  }

  loadTableSettings(): void {
    this.tableSettings = {
    actions: {
      custom: [
        {
          name: 'add',
          title: '<i class="nb-plus"></i>',
        },
        {
          name: 'update',
          title: '<i class="nb-edit"></i>',
        },
        {
          name: 'delete',
          title: '<i class="nb-trash"></i>',
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    pager: { display: true, perPage: 10 },
    columns: {
      tarifaId: {
        title: this.tableColumnHeaders[0],
        type: 'number',
      },
      tazaAdulto: {
        title: this.tableColumnHeaders[1],
        type: 'number',
      },
      tazaNinio: {
        title: this.tableColumnHeaders[2],
        type: 'number',
      },
      tazaBebe: {
        title: this.tableColumnHeaders[3],
        type: 'number',
      },
      tazaJubilado: {
        title: this.tableColumnHeaders[4],
        type: 'number',
      },
      fechaDeVigencia: {
        title: this.tableColumnHeaders[5],
        type: 'date',
      },
    },
  }
}
  
  onCustom(event) {
    console.log(`Custom event '${event.action}' fired on row №: ${event.data.tarifaId}`)
    var asd:Tarifa = event.data
    if (event.action === 'add') {
      this.createAdministrador()  
    }
    if (event.action === 'update') {
      this.updateAdministrador(asd.tarifaId)  
    }
    if (event.action === 'delete') {
      this.deleteAdministrador(asd.tarifaId)  
    }
  }
}
