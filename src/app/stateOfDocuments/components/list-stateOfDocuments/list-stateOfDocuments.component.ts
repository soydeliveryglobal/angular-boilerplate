import { StateOfDocumentsService } from './../../../core/services/abm/stateOfDocuments.service';
import { StateOfDocument } from './../../../core/models/StateOfDocument';
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
  selector: 'list-stateOfDocuments',
  templateUrl: './list-stateOfDocuments.template.html',
  styleUrls: ['./list-stateOfDocuments.scss'],
})
export class ListStateOfDocumentsComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  StateOfDocuments:MatTableDataSource<StateOfDocument>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.stateOfDocumentsService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.StateOfDocuments = new MatTableDataSource(res.data);
      this.StateOfDocuments.sort = this.sort;
    });
  }

  constructor(
    private stateOfDocumentsService: StateOfDocumentsService,
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

  deleteStateOfDocument(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFDOCUMENT,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateStateOfDocument(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFDOCUMENT,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  stateOfDocumentDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFDOCUMENT,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createStateOfDocument() {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFDOCUMENT,
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
