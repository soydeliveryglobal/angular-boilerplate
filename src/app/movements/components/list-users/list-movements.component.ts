
import { Movement } from '../../../core/models/Movement';
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
import { MovementsService } from 'src/app/core/services/abm/movements.service';


@Component({
  selector: 'list-movements',
  templateUrl: './list-movements.template.html',
  styleUrls: ['./list-movements.scss'],
})
export class ListMovementsComponent extends Paginador implements OnInit {
  
  @ViewChild(MatSort)
  sort: MatSort;
  Movements: MatTableDataSource<Movement>;
  git;
  environment = environment;


  displayedColumns: string[] = ['details', 'product', 'movementType', 'quantity', 'unity', 'time', 'enableIn', 'enableOut', 'actions'];


  ngOnInit() {
    this.consultar();
  }

  private consultar() {
    this.movementsService.getAll().subscribe((res: ResponseAll) => {
      this.Movements = new MatTableDataSource<Movement>(res.data);
      this.Movements.sort = this.sort;


    });
  }

  constructor(
    private movementsService: MovementsService,
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

  deleteMovement(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_MOVEMENT,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateMovement(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_MOVEMENT,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  movementDetail(guid: string ) {
    this.router.navigate([
      environment.FORM_CRUD_MOVEMENT,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createMovement() {
    this.router.navigate([
      environment.FORM_CRUD_MOVEMENT,
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
