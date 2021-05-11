import { environment } from './../../../../environments/environment';
import { Paginador } from './../../paginador';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { VarietiesService } from 'src/app/core/services/abm/varieties.service';
import { LineService } from 'src/app/core/services/abm/lines.service';
import { ProviderService } from './../../../core/services/abm/provider.service';
import { BrandService } from './../../../core/services/abm/brand.service';
import { CategoriesService } from './../../../core/services/abm/categories.service';
import { ProductsService } from './../../../core/services/abm/products.service';
import { FamiliesService } from './../../../core/services/abm/families.service';
import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Category } from './../../../core/models/Category';
import { Brand } from './../../../core/models/Brand';
import { Family } from './../../../core/models/Family';
import { Variety } from './../../../core/models/Variety';
import { Provider } from './../../../core/models/Provider';
import { Line } from './../../../core/models/Line';
import { DtoProductModal } from './products-modal-dto';
import { Product, ProductOrServiceType } from './../../../core/models/Product';
import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss'],
})
export class ProductsModalComponent extends Paginador  implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? Object.values(c1)[0] === Object.values(c2)[0] : c1 === c2;
  }

  compareFnBool(c1: ProductOrServiceType, c2: ProductOrServiceType): boolean {
    return c1 && c2 ? c1 == c2 : c1 == c2;
  }

  @Output() productsOut = new EventEmitter<Product[]>();

  displayedColumns: string[] = ['check','name','description','category','family','line','brand','variety', 'eanCode','externalCode','storeCode','useStock'];

  productsSelected: Product[] = [];
  Products:MatTableDataSource<Product>;
  categories: Category[];
  brands: Brand[];
  families: Family[];
  varieties: Variety[];
  providers: Provider[];
  lines: Line[];
  environment = environment;
  private _indexOfDuplicated:number;
  @ViewChild('paginator') paginator: MatPaginator;

  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    private productsService: ProductsService,
    private familiesService:FamiliesService,
    private categoriesService:CategoriesService,
    private brandService:BrandService,
    private providerService:ProviderService,
    private lineService:LineService,
    private varietiesService:VarietiesService,
    private translate: TranslateService,
    private i18nService: I18nServiceService,
    @Inject(MAT_DIALOG_DATA) public data: {dtoProductModal: DtoProductModal}
  ) {
    super();
    this.i18nService.localeEvent$.subscribe((locale) => {
        this.translate.use(locale);
      });
      
  
  }

   getProducts() {
    this.removeFiltersFromLocalSorage();
    this.setFiltersInLocalSorage();
    const query = this.createQuery()
    this.productsService.getAll(query).subscribe((res: ResponseAll) => {
      this.Products = new MatTableDataSource(res.data);
      this.Products.sort = this.sort;
      this.pagina= res.page;
      this.cantidadDeRegistros = res.count;
    });
  }


  newGetProducts(){
    this.pagina = environment.PAGINA_INICIAL
    this.paginator.firstPage()
    this.getProducts();
  }
  
  private loadCategories(){
    this.categoriesService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.categories = res.data
    });
  }
  private loadBrands(){
    this.brandService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.brands = res.data
    });
  }
  private loadFamilies(){
    this.familiesService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.families = res.data
    });
  }
  private loadLines(){
    this.lineService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.lines = res.data
    });
  }
  private loadVarieties(){
    this.varietiesService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.varieties = res.data
    });
  }

  loadProviders(){
    this.providerService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.providers = res.data
    });
  }

  private loadComboBoxes(){
    this.loadCategories()
    this.loadBrands()
    this.loadFamilies()
    this.loadLines()
    this.loadVarieties()
    this.loadProviders()
}
  ngOnInit(): void {
    this.loadComboBoxes()
    this.loadFiltersFromLocalSorage()
    this.getProducts();

  }

  onOk():void{
    this.productsOut.emit(this.productsSelected)
    this.closeDialog()
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  addOrRemoveProductSelected(inputChecked:boolean,inputHidden:boolean,product:Product){
    if(inputChecked){
      this.addToProductSelected(product)
    }else if(!inputChecked && !inputHidden){
      this.removeFromProductSelected(product)
    }
  }


  addToProductSelected(product:Product){
    this.productsSelected.push(product)
  }

  removeFromProductSelected(product:Product){
    const productFiltered = this.searchIndexOfDuplicatedProduct(product)
    this.removeDuplicatedProduct(productFiltered)

  }
  searchIndexOfDuplicatedProduct(product:Product){
    return this.productsSelected.filter((el, i) => {
      if (el.productGUID == product.productGUID) this._indexOfDuplicated = i;
      return el.productGUID == product.productGUID;
    });
  }

  isProductSelected(product: Product){

      return this.productsSelected.filter(el => el.productGUID === product.productGUID).length > 0;
      
  }

 

  removeDuplicatedProduct(products:Product[]){
    if (products.length != 0 ) {
      this._indexOfDuplicated !== 0 ? this.productsSelected.splice(this._indexOfDuplicated,this._indexOfDuplicated) : this.productsSelected.splice(0,1)
    } 
  }


  public pageEvent(page: PageEvent ){
    if (!page){
        this.pagina = environment.PAGINA_INICIAL;
    }else{
        this.pagina = Number(page.pageIndex);
        this.pageSize = page.pageSize;
    }
    
    this.getProducts();
  } 

  
  createQuery():string{
    let filters = ''
    this.data.dtoProductModal.name ? filters = `${filters}&name=${this.data.dtoProductModal.name}` : null
    this.data.dtoProductModal.description ? filters = `${filters}&description=${this.data.dtoProductModal.description}` : null
        
    this.data.dtoProductModal.eanCode ? filters = `${filters}&eanCode=${this.data.dtoProductModal.eanCode}` : null
    this.data.dtoProductModal.storeCode ? filters = `${filters}&storeCode=${this.data.dtoProductModal.storeCode}` : null

    this.data.dtoProductModal.category ? filters = `${filters}&categoryName=${this.data.dtoProductModal.category.name}` : null
    this.data.dtoProductModal.brand ? filters = `${filters}&brandName=${this.data.dtoProductModal.brand.name}` : null
    this.data.dtoProductModal.family ? filters = `${filters}&familyName=${this.data.dtoProductModal.family.name}` : null
    this.data.dtoProductModal.variety ? filters = `${filters}&varietyName=${this.data.dtoProductModal.variety.name}` : null
    this.data.dtoProductModal.line ? filters = `${filters}&lineName=${this.data.dtoProductModal.line.name}` : null
    this.data.dtoProductModal.useStock != null ? filters = `${filters}&useStock=${this.data.dtoProductModal.useStock}` : null
    this.data.dtoProductModal.productOrService != null ? filters = `${filters}&productOrService=${this.data.dtoProductModal.productOrService}` : null
    return `${filters}${this.createPaging()}`
  }

  removeFiltersFromLocalSorage(){
    localStorage.removeItem(environment.PRODUCTS_MODAL_CATEGORY_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_BRAND_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_FAMILY_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_LINE_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_VARIETY_FILTER);

    localStorage.removeItem(environment.PRODUCTS_MODAL_EAN_CODE_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_STORE_CODE_FILTER);

    localStorage.removeItem(environment.PRODUCTS_MODAL_USE_STOCK_FILTER);
    localStorage.removeItem(environment.PRODUCTS_MODAL_PRODUCT_OR_SERVICE_FILTER);
  }

  setFiltersInLocalSorage(){
    localStorage.setItem(environment.PRODUCTS_MODAL_CATEGORY_FILTER,JSON.stringify(this.data.dtoProductModal.category));
    localStorage.setItem(environment.PRODUCTS_MODAL_BRAND_FILTER,JSON.stringify(this.data.dtoProductModal.brand));
    localStorage.setItem(environment.PRODUCTS_MODAL_FAMILY_FILTER,JSON.stringify(this.data.dtoProductModal.family));
    localStorage.setItem(environment.PRODUCTS_MODAL_LINE_FILTER,JSON.stringify(this.data.dtoProductModal.line));
    localStorage.setItem(environment.PRODUCTS_MODAL_VARIETY_FILTER,JSON.stringify(this.data.dtoProductModal.variety));


    localStorage.setItem(environment.PRODUCTS_MODAL_EAN_CODE_FILTER,JSON.stringify(this.data.dtoProductModal.eanCode));
    localStorage.setItem(environment.PRODUCTS_MODAL_STORE_CODE_FILTER,JSON.stringify(this.data.dtoProductModal.storeCode));

    localStorage.setItem(environment.PRODUCTS_MODAL_USE_STOCK_FILTER,JSON.stringify(this.data.dtoProductModal.useStock));
    localStorage.setItem(environment.PRODUCTS_MODAL_PRODUCT_OR_SERVICE_FILTER,JSON.stringify(this.data.dtoProductModal.productOrService));
  }

  loadFiltersFromLocalSorage(){
    this.data.dtoProductModal.category = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_CATEGORY_FILTER))
    this.data.dtoProductModal.brand = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_BRAND_FILTER))
    this.data.dtoProductModal.family = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_FAMILY_FILTER))
    this.data.dtoProductModal.line = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_LINE_FILTER))
    this.data.dtoProductModal.variety = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_VARIETY_FILTER))

    this.data.dtoProductModal.eanCode = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_EAN_CODE_FILTER))
    this.data.dtoProductModal.storeCode = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_STORE_CODE_FILTER))

    this.data.dtoProductModal.useStock = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_USE_STOCK_FILTER))
    this.data.dtoProductModal.productOrService = JSON.parse(localStorage.getItem(environment.PRODUCTS_MODAL_PRODUCT_OR_SERVICE_FILTER))
  }
}
