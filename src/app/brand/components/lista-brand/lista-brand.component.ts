import { BrandService } from './../../../core/services/abm/brand.service';
import { Brand } from './../../../core/models/Brand';
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
  selector: 'lista-brand',
  templateUrl: './lista-brand.template.html',
  styleUrls: ['./lista-brand.scss'],
})
export class ListaBrandComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Brands:MatTableDataSource<Brand>;
  environment = environment;


  displayedColumns: string[] = ['name','description','createdOn','updatedOn','actions'];

  ngOnInit() {
   // this.consultar();
  }

  private consultar(query:string) {
    this.brandService.getAll(query).subscribe((res: ResponseAll) => {
      this.Brands = new MatTableDataSource(res.data);
      this.Brands.sort = this.sort;
      this.pagina= res.page;
      this.cantidadDeRegistros = res.count;
    });
  }

  constructor(
    private brandService: BrandService,
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


  deleteBrand(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_BRAND,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateBrand(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_BRAND,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  brandDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_BRAND,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createBrand() {
    this.router.navigate([
      environment.FORM_CRUD_BRAND,
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
