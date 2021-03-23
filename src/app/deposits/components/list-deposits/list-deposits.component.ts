import { Deposit } from '../../../core/models/Deposit';
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
import { DepositsService } from 'src/app/core/services/abm/deposits.services';

@Component({
  selector: 'list-deposits',
  templateUrl: './list-deposits.template.html',
  styleUrls: ['./list-deposits.scss'],
})
export class ListDepositsComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Deposits:MatTableDataSource<Deposit>;
  environment = environment;


  displayedColumns: string[] = ['name','description','intelliCode','enableIn','enableOut','actions'];


  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.depositsService.getAll().subscribe((res: ResponseAll) => {
      this.Deposits = new MatTableDataSource(res.data);
      this.Deposits.sort = this.sort;
    });
  }

  constructor(
    private depositsService: DepositsService,
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

  deleteDeposit(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOSIT,
      GUID,
      environment.MODO_DELETE,
    ]);
  }

  updateDeposit(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOSIT,
      GUID,
      environment.MODO_UPDATE,
    ]);
  }

  depositDetail(GUID: string) {
    this.router.navigate([
      environment.FORM_CRUD_DEPOSIT,
      GUID,
      environment.MODO_DISPLAY,
    ]);
  }

  createDeposit() {
    this.router.navigate([
      environment.FORM_CRUD_DEPOSIT,
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
