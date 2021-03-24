import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Provider } from './../../../core/models/provider';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProviderService } from 'src/app/core/services/abm/provider.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'lista-provider',
  templateUrl: './lista-provider.template.html',
  styleUrls: ['./lista-provider.scss'],
})
export class ListaProviderComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Providers:MatTableDataSource<Provider>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.providerService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.Providers = new MatTableDataSource(res.data);
      this.Providers.sort = this.sort;
    });
  }

  constructor(
    private providerService: ProviderService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });

    this.consultar()
  }

  deleteProvider(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROVIDER,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateProvider(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROVIDER,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  providerDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PROVIDER,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createProvider() {
    this.router.navigate([
      environment.FORM_CRUD_PROVIDER,
      0,
      environment.MODO_CREATE,
    ]);
  }


  public  pageEvent(page: PageEvent ){   
    if (!page){
        this.pagina = environment.PAGINA_INICIAL;  
    }else{
        this.pagina = Number(page.pageIndex);
        this.pageSize = page.pageSize 
    }
    this.consultar();
  } 


  
  
}
