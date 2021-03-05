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
  selector: 'form-provider',
  templateUrl: './form-provider.component.html'
})


export class FormProviderComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  ProviderForm: FormGroup;
  tituloformulario: string;
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
    this.iniciar();
  }
  
  private inicializarObjetosPrincipales(){
    this.provider = new Provider();
  }

  private obtenerVariablesDelRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  definirTituloFormulario(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.tituloformulario = `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.tituloformulario =  `${environment.DOMAIN_NAME_PROVIDER}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private inicializarFormulario(){
    this.ProviderForm = this.formBuilder.group({
      providerGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private cargarProvider(){
    if (this.guid != ""){ 
        this.ProviderService.getOne(this.guid).subscribe(provider => {
        this.provider = provider;            
      });
    }else{
      
    }
    
  }
  
  private iniciar(){
    this.inicializarObjetosPrincipales();
    this.obtenerVariablesDelRouter(); 
    this.definirTituloFormulario();
    this.inicializarFormulario();  
    this.cargarProvider();
  }

 
  
  private actualizarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateProvider();
      return true;
    }
    return false;
  }
  
  private crearSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createProvider();
      return true;
    }
    return false;
  }

  private eliminarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteProvider();
      
      return true;
    } 
    return false;
  }

  private displaySiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_DISPLAY)
    {      
      this.gotoList();
      return true;
    }       
    return false;
  }

  private formularioValido(): boolean{
    return this.ProviderForm.errors==null;
  }

  public realizarOperacionesCrud(){
    if (this.actualizarSiCorrespondeModo()){
      return;
    }
    if (this.crearSiCorrespondeModo()){
      return;
    }
    if (this.eliminarSiCorrespondeModo()){
      return;
    }
    if (this.displaySiCorrespondeModo()){
      return;
    }
  }

  public onSubmit(){
    this.submitted = true;

    if (!this.formularioValido()){
      //alertify.alert(environment.VERIFIFICAR_FORM_INVALIDO);
      console.log(environment.VERIFIFICAR_FORM_INVALIDO)
      return;
    }
    this.realizarOperacionesCrud();
  }

  deleteProvider() {
    this.ProviderService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  createProvider() {
    this.ProviderService.post(this.provider).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  updateProvider() {
    this.ProviderService.put(this.guid, this.provider).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORMULARIO_LISTA_PROVIDER]);
  }

  get f() { 
    return this.ProviderForm.controls; 
  }


}


