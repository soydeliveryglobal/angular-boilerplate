import { Category } from './../../../core/models/Category';
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
import { CategoriesService } from 'src/app/core/services/abm/categories.service';

@Component({
  selector: 'list-categories',
  templateUrl: './list-categories.template.html',
  styleUrls: ['./list-categories.scss'],
})
export class ListCategoriesComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Categories:MatTableDataSource<Category>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar() {
    this.categoriesService.getAll().subscribe((res: ResponseAll) => {
      this.Categories = new MatTableDataSource(res.data);
      this.Categories.sort = this.sort;
    });
  }

  constructor(
    private categoriesService: CategoriesService,
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

  deleteCategory(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_CATEGORY,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateCategory(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_CATEGORY,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  categoryDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_CATEGORY,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createCategory() {
    this.router.navigate([
      environment.FORM_CRUD_CATEGORY,
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