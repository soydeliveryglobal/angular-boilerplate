import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Provider } from './../../../core/models/provider';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Util } from 'src/app/util';
import { environment } from 'src/environments/environment';
import { ProviderService } from 'src/app/core/services/abm/provider.service';
import { LoginService } from 'src/app/core/services/login.service';

@Component({
  selector: 'lista-provider',
  templateUrl: './lista-provider.template.html',
  styleUrls: ['./lista-provider.scss'],
})
export class ListaProviderComponent implements OnInit {
  providers: Provider[];
  environment = environment;
  Util = Util;


  tableSettings = {};
  tableColumnHeaders: string[];
  

  ngOnInit() {
    this.consultar();
  }

  private consultar() {
    this.providerService.getAll().subscribe((res: ResponseAll) => {
      this.providers = res.data;
    });
  }

  constructor(
    private providerService: ProviderService,
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

  deleteProvider(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_PROVIDER,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateProvider(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_PROVIDER,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  providerDetail(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_PROVIDER,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createProvider() {
    this.router.navigate([
      environment.FORMULARIO_CRUD_DEL_PROVIDER,
      0,
      environment.MODO_CREATE,
    ]);
  }


  setColumnheaders(): void {
    let providerGUID = 'GUID';
    let name = 'PROVIDER.COLUMN_NAME';
    let description = 'PROVIDER.COLUMN_DESCRIPTION';
    let createdOn = 'PROVIDER.COLUMN_CREATED_ON';
    let updatedOn = 'PROVIDER.COLUMN_UPDATED_ON';
    this.tableColumnHeaders = [providerGUID,name,description,createdOn,updatedOn]
  
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
      providerGUID: {
        title: this.tableColumnHeaders[0],
        type: 'string',
        visible:false
      },
      name: {
        title: this.tableColumnHeaders[1],
        type: 'string',
      },
      description: {
        title: this.tableColumnHeaders[2],
        type: 'string',
      },
      createdOn: {
        title: this.tableColumnHeaders[3],
        type: 'date',
      },
      updatedOn: {
        title: this.tableColumnHeaders[4],
        type: 'date',
      },
    },
  }
}
  
  onCustom(event) {
    console.log(`Custom event '${event.action}' fired on row №: ${event.data.providerId}`)
    var provider:Provider = event.data
    if (event.action === 'add') {
      this.createProvider()  
    }
    if (event.action === 'update') {
      this.updateProvider(provider.providerGUID)  
    }
    if (event.action === 'delete') {
      this.deleteProvider(provider.providerGUID)  
    }
  }
}
