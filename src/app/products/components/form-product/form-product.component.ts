import { Family } from './../../../core/models/Family';
import { Variety } from './../../../core/models/Variety';
import { Line } from './../../../core/models/Line';
import { Provider } from './../../../core/models/Provider';
import { Brand } from './../../../core/models/Brand';
import { IGUID } from './../../../core/models/IGUID';
import { ResponseAll } from './../../../core/models/ResponseAll';
import { Category } from './../../../core/models/Category';
import { LineService } from 'src/app/core/services/abm/lines.service';
import { VarietiesService } from 'src/app/core/services/abm/varieties.service';
import { ProviderService } from './../../../core/services/abm/provider.service';
import { BrandService } from 'src/app/core/services/abm/brand.service';
import { CategoriesService } from 'src/app/core/services/abm/categories.service';
import { FamiliesService } from './../../../core/services/abm/families.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Product, ProductOrServiceType } from './../../../core/models/Product';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProductsService } from 'src/app/core/services/abm/products.service';

@Component({
  selector: 'form-product',
  templateUrl: './form-product.component.html',
  styleUrls:['./form-product.scss']
})


export class FormProductComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  ProductForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  product: Product;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;

  categories:Category[]
  brands:Brand[]
  families:Family[]
  varieties:Variety[]
  providers:Provider[]
  lines:Line[]


  compareFn(c1:any, c2: any): boolean {
    return c1 && c2 ? Object.values(c1)[0] === Object.values(c2)[0] : c1 === c2;
  }

  compareFnBool(c1:ProductOrServiceType, c2: ProductOrServiceType): boolean {
    return c1 && c2 ? c1 == c2 : c1 == c2;
  }

  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private productsService: ProductsService,
              private familiesService:FamiliesService,
              private categoriesService:CategoriesService,
              private brandService:BrandService,
              private providerService:ProviderService,
              private lineService:LineService,
              private varietiesService:VarietiesService,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private i18nService: I18nServiceService){
      
      this.i18nService.localeEvent$.subscribe((locale) => {
        this.translate.use(locale);
      });

      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };
      this.mySubscription = this.router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.router.navigated = false;
        }
      });
  }


  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.start();
  }
  
  private initializeMainObjects(){
    this.product = new Product();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_PRODUCTS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_PRODUCTS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_PRODUCTS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_PRODUCTS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.ProductForm = this.formBuilder.group({
      productGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['',[Validators.required]],
      family: ['',[Validators.required]],
      line: ['',[Validators.required]],
      provider: ['',[Validators.required]],
      brand: ['',[Validators.required]],
      storeCode: ['',[Validators.required]],
      eanCode: ['',[Validators.required]],
      externalCode: ['',[Validators.required]],
      useStock: ['',[Validators.required]],
      variety: ['',[Validators.required]],
      productOrService: ['',[Validators.required]],
    });
  }  

  private loadProduct(){
    if (this.guid != ""){ 
        this.productsService.getOne(this.guid).subscribe(product => {
        this.product = product;
      });
    }else{
      
    }
  }

  private loadCategories(){
    this.categoriesService.getAll().subscribe((res: ResponseAll) => {
      this.categories = res.data
    });
  }
  private loadBrands(){
    this.brandService.getAll().subscribe((res: ResponseAll) => {
      this.brands = res.data
    });
  }
  private loadFamilies(){
    this.familiesService.getAll().subscribe((res: ResponseAll) => {
      this.families = res.data
    });
  }
  private loadLines(){
    this.lineService.getAll().subscribe((res: ResponseAll) => {
      this.lines = res.data
    });
  }
  private loadVarieties(){
    this.varietiesService.getAll().subscribe((res: ResponseAll) => {
      this.varieties = res.data
    });
  }

  loadProviders(){
    this.providerService.getAll().subscribe((res: ResponseAll) => {
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
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();
    this.loadComboBoxes();
    this.loadProduct();

  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateProduct();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createProduct();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteProduct();
      
      return true;
    } 
    return false;
  }

  private displayIfIsMode(): boolean{
    if (this.mode == environment.MODO_DISPLAY)
    {      
      this.gotoList();
      return true;
    }       
    return false;
  }

  private isFormValid(): boolean{
    return this.ProductForm.valid;
  }

  public doCrudOperation(){
    if (this.updateIfIsMode()){
      return;
    }
    if (this.createIfIsMode()){
      return;
    }
    if (this.deleteIfIsMode()){
      return;
    }
    if (this.displayIfIsMode()){
      return;
    }
  }

  public onSubmit(){
    this.submitted = true;

    if (!this.isFormValid()){
      //alertify.alert(environment.VERIFIFICAR_FORM_INVALIDO);
      alert(environment.VERIFIFICAR_FORM_INVALIDO)
      return;
    }
    this.doCrudOperation();
  }

  deleteProduct() {
    this.productsService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createProduct() {
    this.productsService.post(this.product).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateProduct() {
    this.productsService.put(this.guid, this.product).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_PRODUCTS]);
  }

  get f() { 
    return this.ProductForm.controls; 
  }


}


