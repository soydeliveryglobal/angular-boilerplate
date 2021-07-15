import { Variety } from './../../../core/models/Variety';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { VarietiesService } from 'src/app/core/services/abm/varieties.service';
import { PopUpsVarieties } from './pop-ups-varieties';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pop-up-varieties',
  templateUrl: './pop-up-varieties.component.html',
  styleUrls: ['./pop-up-varieties.component.scss']
})
export class PopUpVarietiesComponent implements OnInit {

  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  VarietyForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  variety: Variety;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private VarietiesService: VarietiesService, private formBuilder: FormBuilder,
              private translate: TranslateService,
              private i18nService: I18nServiceService,
              private dialogref: MatDialogRef<PopUpsVarieties>){
      
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
    this.variety = new Variety();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_VARIETIES}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_VARIETIES}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_VARIETIES}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_VARIETIES}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.VarietyForm = this.formBuilder.group({
      varietyGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadVariety(){
    if (this.guid != ""){ 
        this.VarietiesService.getOne(this.guid).subscribe(variety => {
        this.variety = variety;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadVariety();
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createVariety();
      return true;
    }
    return false;
  }

  

  private isFormValid(): boolean{
    return this.VarietyForm.valid;
  }

  public doCrudOperation(){
    
    if (this.createIfIsMode()){
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

  

  createVariety() {
    this.VarietiesService.post(this.variety).subscribe(data => {
      this.closeDialogo();
      this.ngOnInit();
    }, error => alert(error.error));
  }


  get f() { 
    return this.VarietyForm.controls; 
  }

  closeDialogo():void{
    this.dialogref.close();
  }

}
