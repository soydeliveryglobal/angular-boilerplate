import { I18nServiceService } from './../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TarifaService } from 'src/app/core/services/tarifa.service';
import { Tarifa } from 'src/app/core/models/tarifa';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';

@Component({
  selector: 'form-tarifa',
  templateUrl: './form-tarifa.component.html'
})


export class FormTarifaComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  TarifaForm: FormGroup;
  tituloformulario: string;
  id: number;
  mode: string;
  tarifa: Tarifa;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  dtoDatePickerInCheckIn: DtoDatePickerIn;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private TarifaService: TarifaService, private formBuilder: FormBuilder,
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

  seleccionaFecha(checkIn: Date){
    this.tarifa.fechaDeVigencia = checkIn;
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
    this.tarifa = new Tarifa();
  }

  private obtenerVariablesDelRouter(){
    this.id = this.route.snapshot.params[environment.PARAMETRO_RUTEO_ID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  definirTituloFormulario(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_TARIFA}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_TARIFA}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.tarifa.tarifaId = 0;
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.tituloformulario = `${environment.DOMAIN_NAME_TARIFA}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.tituloformulario =  `${environment.DOMAIN_NAME_TARIFA}.${environment.TITLE_FORM_DISPLAY}`;
    }
  }
  
  
  private inicializarFormulario(){
    this.TarifaForm = this.formBuilder.group({
      tarifaId: [0, [Validators.required]],
      fechaDeVigencia: ['', [Validators.required]],
      tazaAdulto: ['', [Validators.required]],
      tazaNinio: ['', [Validators.required]],
      tazaBebe: ['', [Validators.required]],
      tazaJubilado:['', [Validators.required]],
      tazaJubiladoConPromo: ['', [Validators.required]],
      cantidadJubiladosPromo:  ['', [Validators.required]]
    });
  }  

  private cargarTarifa(){
    this.dtoDatePickerInCheckIn = new DtoDatePickerIn();
    if (this.id != 0){ 
        this.TarifaService.getOne(this.id).subscribe(tarifa => {
        this.tarifa = tarifa;            
        this.dtoDatePickerInCheckIn.fecha = this.tarifa.fechaDeVigencia;
        this.dtoDatePickerInCheckIn.etiqueta = "Fecha de vigencia";
        this.dtoDatePickerInCheckIn.formato = environment.LOCALE_STRING;
        this.dtoDatePickerInCheckIn.catoscargados = true;
      });
    }else{
      this.dtoDatePickerInCheckIn.catoscargados = true;
    }
    
  }
  
  private iniciar(){
    this.inicializarObjetosPrincipales();
    this.obtenerVariablesDelRouter(); 
    this.definirTituloFormulario();
    this.inicializarFormulario();  
    this.cargarTarifa();
  }

 
  
  private actualizarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateTarifa();
      return true;
    }
    return false;
  }
  
  private crearSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_CREATE){     
      this.createTarifa();
      return true;
    }
    return false;
  }

  private eliminarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteTarifa();
      
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
    return this.TarifaForm.errors==null;
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

  deleteTarifa() {
    this.TarifaService.delete(this.id).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  createTarifa() {
    this.TarifaService.post(this.tarifa).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  updateTarifa() {
    this.TarifaService.put(this.id, this.tarifa).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORMULARIO_LISTA_TARIFAS]);
  }

  get f() { 
    return this.TarifaForm.controls; 
  }


}


