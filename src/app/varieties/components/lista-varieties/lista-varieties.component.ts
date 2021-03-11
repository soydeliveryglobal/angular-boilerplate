import { Variety } from './../../../core/models/Variety';
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
import { VarietiesService } from 'src/app/core/services/abm/varieties.service';

@Component({
  selector: 'lista-varieties',
  templateUrl: './lista-varieties.template.html',
  styleUrls: ['./lista-varieties.scss'],
})
export class ListaVarietiesComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Varieties:MatTableDataSource<Variety>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.varietiesService.getAll().subscribe((res: ResponseAll) => {
      this.Varieties = new MatTableDataSource(res.data);
      this.Varieties.sort = this.sort;
    });
  }

  constructor(
    private varietiesService: VarietiesService,
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

  deleteVariety(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_VARIETY,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateVariety(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_VARIETY,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  varietyDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_VARIETY,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createVariety() {
    this.router.navigate([
      environment.FORM_CRUD_VARIETY,
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
