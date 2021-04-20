import { PageEvent } from '@angular/material/paginator';
import { Paginador } from './../../../navigation/paginador';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { StateOfActor } from './../../../core/models/stateofactor';
import { Component, OnInit,AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StateOfActorService } from 'src/app/core/services/abm/stateOfActors.service';
import { LoginService } from 'src/app/core/services/login.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'list-stateofactor',
  templateUrl: './list-stateofactor.template.html',
  styleUrls: ['./list-stateofactor.scss'],
})
export class ListStateOfActorComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  StateOfActors:MatTableDataSource<StateOfActor>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.stateofactorService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.StateOfActors = new MatTableDataSource(res.data);
      this.StateOfActors.sort = this.sort;
    });
  }

  constructor(
    private stateofactorService: StateOfActorService,
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

  deleteStateOfActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFACTORS,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateStateOfActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFACTORS,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  stateOfActorDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFACTORS,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createStateOfActor() {
    this.router.navigate([
      environment.FORM_CRUD_STATEOFACTORS,
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
