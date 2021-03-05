import { LineService } from 'src/app/core/services/abm/lines.service';

import { Line } from './../../../core/models/Line';
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
  selector: 'lista-line',
  templateUrl: './lista-lines.template.html',
  styleUrls: ['./lista-lines.scss'],
})
export class ListaLinesComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Lines:MatTableDataSource<Line>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.lineService.getAll().subscribe((res: ResponseAll) => {
      this.Lines = new MatTableDataSource(res.data);
      this.Lines.sort = this.sort;
    });
  }

  constructor(
    private lineService: LineService,
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

  deleteLine(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_LINES,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateLine(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_LINES,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  lineDetail(guid: string) {
    this.router.navigate([
      environment.FORMULARIO_CRUD_LINES,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createLine() {
    this.router.navigate([
      environment.FORMULARIO_CRUD_LINES,
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
