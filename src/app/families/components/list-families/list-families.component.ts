import { FamiliesService } from './../../../core/services/abm/families.service';
import { Family } from './../../../core/models/Family';
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
  selector: 'list-families',
  templateUrl: './list-families.template.html',
  styleUrls: ['./list-families.scss'],
})
export class ListFamiliesComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Families:MatTableDataSource<Family>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar(query:string) {
    this.familiesService.getAll(query).subscribe((res: ResponseAll) => {
      this.Families = new MatTableDataSource(res.data);
      this.Families.sort = this.sort;
      this.pagina= res.page;
      this.cantidadDeRegistros = res.count;
    });
  }

  constructor(
    private familiesService: FamiliesService,
    private router: Router,
    private login: LoginService,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
      this.translate.use(locale);
    });

    const query = this.createPaging()
    this.consultar(query);
  }

  deleteFamily(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_FAMILY,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateFamily(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_FAMILY,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  familyDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_FAMILY,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createFamily() {
    this.router.navigate([
      environment.FORM_CRUD_FAMILY,
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
    const query = this.createPaging()
    this.consultar(query);
  } 
  
}
