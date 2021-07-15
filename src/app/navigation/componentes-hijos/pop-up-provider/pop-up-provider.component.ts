import { MatDialogRef } from '@angular/material/dialog';
import { PopUpsProviders } from './pop-ups-provider';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ProviderService } from 'src/app/core/services/abm/provider.service';
import { Provider } from 'src/app/core/models/provider';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';



@Component({
  selector: 'app-pop-up-provider',
  templateUrl: './pop-up-provider.component.html',
  styleUrls: ['./pop-up-provider.component.scss']
})
export class PopUpProviderComponent implements OnInit {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  ProviderForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  provider: Provider;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  dtoDatePickerInCheckIn: DtoDatePickerIn;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private ProviderService: ProviderService, private formBuilder: FormBuilder,
              private translate: TranslateService,
              private i18nService: I18nServiceService,
              private dialogref: MatDialogRef<PopUpsProviders>){
      
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
    this.provider = new Provider();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.ProviderForm = this.formBuilder.group({
      providerGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadProvider(){
    if (this.guid != ""){ 
        this.ProviderService.getOne(this.guid).subscribe(provider => {
        this.provider = provider;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadProvider();
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createProvider();
      return true;
    }
    return false;
  }

  private isFormValid(): boolean{
    return this.ProviderForm.valid;
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

  

  createProvider() {
    this.ProviderService.post(this.provider).subscribe(data => {
      this.closeDialogo();
      this.ngOnInit();
    }, error => alert(error.error));
  }

 
  get f() { 
    return this.ProviderForm.controls; 
  }

  closeDialogo():void{
    this.dialogref.close();
  }

}
