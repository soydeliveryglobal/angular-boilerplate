import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TypeOfDocumentService } from 'src/app/core/services/abm/typeOfDocuments.service';
import { TypeOfDocument } from 'src/app/core/models/typeOfDocument';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';

@Component({
  selector: 'form-typeOfDocument',
  templateUrl: './form-typeOfDocument.component.html'
})


export class FormTypeOfDocumentComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  TypeOfDocumentForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  typeOfDocument: TypeOfDocument;
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  dtoDatePickerInCheckIn: DtoDatePickerIn;

  constructor(private route: ActivatedRoute, private router: Router,
              private TypeOfDocumentService: TypeOfDocumentService, private formBuilder: FormBuilder,
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
    this.typeOfDocument = new TypeOfDocument();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFDOCUMENTS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFDOCUMENTS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFDOCUMENTS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_TYPEOFDOCUMENTS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.TypeOfDocumentForm = this.formBuilder.group({
      typeOfDocumentGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      regNumPathern: ['', [Validators.required]],
      createdOn: [''],
      updatedOn: ['']
    });
  }  

  private loadTypeOfDocument(){
    if (this.guid != ""){ 
        this.TypeOfDocumentService.getOne(this.guid).subscribe(typeOfDocument => {
        this.typeOfDocument = typeOfDocument;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadTypeOfDocument();
  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateTypeOfDocument();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createTypeOfDocument();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteTypeOfDocument();
      
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
    return this.TypeOfDocumentForm.valid;
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

  deleteTypeOfDocument() {
    this.TypeOfDocumentService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createTypeOfDocument() {
    this.TypeOfDocumentService.post(this.typeOfDocument).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateTypeOfDocument() {
    this.TypeOfDocumentService.put(this.guid, this.typeOfDocument).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
   gotoList() {
    this.router.navigate([environment.FORM_LIST_TYPEOFDOCUMENTS]);
  }

  get f() { 
    return this.TypeOfDocumentForm.controls; 
  }


}


