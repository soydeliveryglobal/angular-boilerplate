import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Office } from './../../../core/models/office';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { OfficeService } from 'src/app/core/services/abm/offices.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-office',
  templateUrl: './list-office.template.html',
  styleUrls: ['./list-office.scss'],
})
export class ListOfficeComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Offices:MatTableDataSource<Office>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.officeService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.Offices = new MatTableDataSource(res.data);
      this.Offices.sort = this.sort;
    });
  }

  constructor(
    private officeService: OfficeService,
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

  deleteOffice(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_OFFICES,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateOffice(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_OFFICES,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  officeDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_OFFICES,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createOffice() {
    this.router.navigate([
      environment.FORM_CRUD_OFFICES,
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