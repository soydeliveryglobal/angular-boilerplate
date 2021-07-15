import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../../core/models/Category';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CategoriesService } from 'src/app/core/services/abm/categories.service';
import { PopUps } from './pop-ups';

@Component({
  selector: 'app-pop-ups',
  templateUrl: './pop-ups.component.html',
  styleUrls: ['./pop-ups.component.scss']
})
export class PopUpsComponent implements OnInit {

  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  CategoryForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  category: Category;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  popUps= new PopUps();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private CategoriesService: CategoriesService,
              private formBuilder: FormBuilder,
              private translate: TranslateService,
              private i18nService: I18nServiceService,
              private dialog: MatDialog,
              private dialogref: MatDialogRef<PopUps>) { 

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
    this.category = new Category();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_CATEGORIES}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_CATEGORIES}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_CATEGORIES}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_CATEGORIES}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  private initializeForm(){
    this.CategoryForm = this.formBuilder.group({
      categoryGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadCategory(){
    if (this.guid != ""){ 
        this.CategoriesService.getOne(this.guid).subscribe(category => {
        this.category = category;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadCategory();
  }

 
  
  
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createCategory();
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
    return this.CategoryForm.valid;
  }

  public doCrudOperation(){
    
    if (this.createIfIsMode()){
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

 

  createCategory() {
    this.CategoriesService.post(this.category).subscribe(data => {
      this.closeDialogo();
      this.ngOnInit();
    }, error => alert(error.error));
  }

  
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_CATEGORIES]);
  }

  get f() { 
    return this.CategoryForm.controls; 
  }


closeDialogo():void{
  this.dialogref.close();
}

}