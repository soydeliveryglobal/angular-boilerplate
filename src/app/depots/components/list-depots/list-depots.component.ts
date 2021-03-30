import { Depot } from '../../../core/models/Depot';
import { PageEvent } from '@angular/material/paginator';
import { Paginador } from '../../../navigation/paginador';
import { ResponseAll } from '../../../core/models/ResponseAll';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DepotsService } from 'src/app/core/services/abm/depots.services';

@Component({
  selector: 'list-depots',
  templateUrl: './list-depots.template.html',
  styleUrls: ['./list-depots.scss'],
})
export class ListDepotsComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Depots:MatTableDataSource<Depot>;
  environment = environment;


  displayedColumns: string[] = ['name','description','intelliCode','enableIn','enableOut','actions'];


  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.depotsService.getAll().subscribe((res: ResponseAll) => {
      this.Depots = new MatTableDataSource(res.data);
      this.Depots.sort = this.sort;
    });
  }

  constructor(
    private depotsService: DepotsService,
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

  deleteDepot(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOT,
      GUID,
      environment.MODO_DELETE,
    ]);
  }

  updateDepot(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOT,
      GUID,
      environment.MODO_UPDATE,
    ]);
  }

  depotDetail(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOT,
      GUID,
      environment.MODO_DISPLAY,
    ]);
  }

  createDepot() {
    this.router.navigate([
      environment.FORM_CRUD_DEPOT,
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
