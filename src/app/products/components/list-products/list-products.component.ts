import { Product } from '../../../core/models/Product';
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
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from 'src/app/core/services/abm/products.service';

@Component({
  selector: 'lista-products',
  templateUrl: './list-products.template.html',
  styleUrls: ['./list-products.scss'],
})
export class ListProductsComponent extends Paginador implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  Products:MatTableDataSource<Product>;
  environment = environment;


  displayedColumns: string[] = ['name','description','category','family','line','brand','variety', 'eanCode','externalCode','storeCode','useStock','actions'];


  ngOnInit() {
   // this.consultar();
  }

  private consultar(query:string) {
    this.productsService.getAll(query).subscribe((res: ResponseAll) => {
      this.Products = new MatTableDataSource(res.data);
      this.Products.sort = this.sort;
      this.pagina= res.page;
      this.cantidadDeRegistros = res.count;
    });
  }

  constructor(
    private productsService: ProductsService,
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

  deleteProduct(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PRODUCT,
      guid,
      environment.MODO_DELETE,
    ]);
  }

  updateProduct(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PRODUCT,
      guid,
      environment.MODO_UPDATE,
    ]);
  }

  productDetail(guid: string) {
    this.router.navigate([
      environment.FORM_CRUD_PRODUCT,
      guid,
      environment.MODO_DISPLAY,
    ]);
  }

  createProduct() {
    this.router.navigate([
      environment.FORM_CRUD_PRODUCT,
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
