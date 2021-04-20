import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { TypeOfActor } from './../../../core/models/typeofactor';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TypeOfActorService } from 'src/app/core/services/abm/typeOfActors.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-typeofactor',
  templateUrl: './list-typeofactor.template.html',
  styleUrls: ['./list-typeofactor.scss'],
})
export class ListTypeOfActorComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  TypeOfActors:MatTableDataSource<TypeOfActor>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.typeofactorService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.TypeOfActors = new MatTableDataSource(res.data);
      this.TypeOfActors.sort = this.sort;
    });
  }

  constructor(
    private typeofactorService: TypeOfActorService,
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

  deleteTypeOfActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFACTORS,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateTypeOfActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFACTORS,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  typeOfActorDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFACTORS,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createTypeOfActor() {
    this.router.navigate([
      environment.FORM_CRUD_TYPEOFACTORS,
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
