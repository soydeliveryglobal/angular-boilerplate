import { HttpErrorResponse } from '@angular/common/http';
import { StateOfDocument } from './../../../core/models/StateOfDocument';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StateOfDocumentsService } from 'src/app/core/services/abm/stateOfDocuments.service';

@Component({
  selector: 'form-stateOfDocument',
  templateUrl: './form-stateOfDocument.component.html'
})


export class FormStateOfDocumentComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  StateOfDocumentForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  stateOfDocument: StateOfDocument;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private StateOfDocumentsService: StateOfDocumentsService, private formBuilder: FormBuilder,
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
    this.stateOfDocument = new StateOfDocument();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFDOCUMENTS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFDOCUMENTS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFDOCUMENTS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_STATEOFDOCUMENTS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.StateOfDocumentForm = this.formBuilder.group({
      stateOfDocumentGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadStateOfDocument(){
    if (this.guid != ""){ 
        this.StateOfDocumentsService.getOne(this.guid).subscribe(stateOfDocument => {
        this.stateOfDocument = stateOfDocument;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadStateOfDocument();
  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateStateOfDocument();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createStateOfDocument();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteStateOfDocument();
      
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
    return this.StateOfDocumentForm.valid;
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

  deleteStateOfDocument() {
    this.StateOfDocumentsService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createStateOfDocument() {
    this.StateOfDocumentsService.post(this.stateOfDocument).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateStateOfDocument() {
    this.StateOfDocumentsService.put(this.guid, this.stateOfDocument).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_STATEOFDOCUMENTS]);
  }

  get f() { 
    return this.StateOfDocumentForm.controls; 
  }


}


