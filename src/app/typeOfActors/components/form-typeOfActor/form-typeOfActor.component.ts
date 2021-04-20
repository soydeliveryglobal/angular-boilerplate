import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TypeOfActorService } from 'src/app/core/services/abm/typeOfActors.service';
import { TypeOfActor } from 'src/app/core/models/typeOfActor';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';

@Component({
  selector: 'form-typeOfActor',
  templateUrl: './form-typeOfActor.component.html'
})


export class FormTypeOfActorComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  TypeOfActorForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  typeOfActor: TypeOfActor;
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  dtoDatePickerInCheckIn: DtoDatePickerIn;

  constructor(private route: ActivatedRoute, private router: Router,
              private TypeOfActorService: TypeOfActorService, private formBuilder: FormBuilder,
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
    this.typeOfActor = new TypeOfActor();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFACTORS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFACTORS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_TYPEOFACTORS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_TYPEOFACTORS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.TypeOfActorForm = this.formBuilder.group({
      typeOfActorGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadTypeOfActor(){
    if (this.guid != ""){ 
        this.TypeOfActorService.getOne(this.guid).subscribe(typeOfActor => {
        this.typeOfActor = typeOfActor;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadTypeOfActor();
  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateTypeOfActor();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createTypeOfActor();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteTypeOfActor();
      
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
    return this.TypeOfActorForm.valid;
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

  deleteTypeOfActor() {
    this.TypeOfActorService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createTypeOfActor() {
    this.TypeOfActorService.post(this.typeOfActor).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateTypeOfActor() {
    this.TypeOfActorService.put(this.guid, this.typeOfActor).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_TYPEOFACTORS]);
  }

  get f() { 
    return this.TypeOfActorForm.controls; 
  }


}


