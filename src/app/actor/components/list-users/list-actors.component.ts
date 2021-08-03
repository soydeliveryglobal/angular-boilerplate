
import { Actor } from '../../../core/models/Actor';
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
import { MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ActorsService } from 'src/app/core/services/abm/actor.service';


@Component({
  selector: 'list-actors',
  templateUrl: './list-actors.template.html',
  styleUrls: ['./list-actors.scss'],
})
export class ListActorsComponent extends Paginador implements OnInit {
  
  @ViewChild(MatSort)
  sort: MatSort;
  Actors: MatTableDataSource<Actor>;
  git;
  environment = environment;


  displayedColumns: string[] = ['name', 'address', 'taxServiceNumber', 'typeOfActor', 'stateOfActor', 'actions'];


  ngOnInit() {
    this.consultar();
  }

  private consultar() {
    this.actorsService.getAll().subscribe((res: ResponseAll) => {
      this.Actors = new MatTableDataSource<Actor>(res.data);
      this.Actors.sort = this.sort;


    });
  }

  constructor(
    private actorsService: ActorsService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });

    this.consultar();
  }

  deleteActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_ACTORS,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateActor(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_ACTORS,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  actorDetail(guid: string ) {
    this.router.navigate([
      environment.FORM_CRUD_ACTORS,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createActor() {
    this.router.navigate([
      environment.FORM_CRUD_ACTORS,
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
