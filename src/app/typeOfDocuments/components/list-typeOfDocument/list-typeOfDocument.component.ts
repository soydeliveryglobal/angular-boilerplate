import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { TypeOfDocument } from './../../../core/models/typeofdocument';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TypeOfDocumentService } from 'src/app/core/services/abm/typeOfDocuments.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-typeofdocument',
  templateUrl: './list-typeofdocument.template.html',
  styleUrls: ['./list-typeofdocument.scss'],
})
export class ListTypeOfDocumentComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  TypeOfDocuments:MatTableDataSource<TypeOfDocument>;
  environment = environment;


  displayedColumns: string[] = ['name','description','regNumPathern','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.typeofdocumentService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.TypeOfDocuments = new MatTableDataSource(res.data);
      this.TypeOfDocuments.sort = this.sort;
    });
  }

  constructor(
    private typeofdocumentService: TypeOfDocumentService,
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

  deleteTypeOfDocument(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFDOCUMENTS,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateTypeOfDocument(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFDOCUMENTS,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  typeOfActorDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFDOCUMENTS,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createTypeOfDocument() {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFDOCUMENTS,
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
