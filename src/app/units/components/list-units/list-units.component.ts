import { UnitsService } from './../../../core/services/abm/units.service';
import { Unit } from './../../../core/models/Unit';
import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-units',
  templateUrl: './list-units.template.html',
  styleUrls: ['./list-units.scss'],
})
export class ListUnitsComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Units:MatTableDataSource<Unit>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.unitsService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.Units = new MatTableDataSource(res.data);
      this.Units.sort = this.sort;
    });
  }

  constructor(
    private unitsService: UnitsService,
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

  deleteUnit(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_UNIT,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateUnit(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_UNIT,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  unitDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_UNIT,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createUnit() {
    this.router.navigate([
      environment.FORM_CRUD_UNIT,
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
