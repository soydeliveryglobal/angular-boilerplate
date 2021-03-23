import { HttpErrorResponse } from '@angular/common/http';
import { Unit } from './../../../core/models/Unit';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UnitsService } from 'src/app/core/services/abm/units.service';

@Component({
  selector: 'form-unit',
  templateUrl: './form-unit.component.html'
})


export class FormUnitComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  UnitForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  unit: Unit;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private UnitsService: UnitsService, private formBuilder: FormBuilder,
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
    this.unit = new Unit();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_UNITS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_UNITS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_UNITS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_UNITS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.UnitForm = this.formBuilder.group({
      unitGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadUnit(){
    if (this.guid != ""){ 
        this.UnitsService.getOne(this.guid).subscribe(unit => {
        this.unit = unit;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadUnit();
  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateUnit();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createUnit();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteUnit();
      
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
    return this.UnitForm.valid;
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

  deleteUnit() {
    this.UnitsService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createUnit() {
    this.UnitsService.post(this.unit).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateUnit() {
    this.UnitsService.put(this.guid, this.unit).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_UNITS]);
  }

  get f() { 
    return this.UnitForm.controls; 
  }


}


