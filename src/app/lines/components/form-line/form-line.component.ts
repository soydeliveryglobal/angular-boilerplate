import { LineService } from 'src/app/core/services/abm/lines.service';
import { Line } from './../../../core/models/Line';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';

@Component({
  selector: 'form-line',
  templateUrl: './form-line.component.html'
})


export class FormLineComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  LineForm: FormGroup;
  tituloformulario: string;
  guid:string;
  mode: string;
  line: Line;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private LineService: LineService, private formBuilder: FormBuilder,
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
    this.line = new Line();
  }

  private obtenerVariablesDelRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  definirTituloFormulario(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.tituloformulario = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.tituloformulario = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.tituloformulario =  `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private inicializarFormulario(){
    this.LineForm = this.formBuilder.group({
      lineGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private cargarLine(){
    if (this.guid != ""){ 
        this.LineService.getOne(this.guid).subscribe(line => {
        this.line = line;            
      });
    }else{
      
    }
    
  }
  
  private iniciar(){
    this.inicializarObjetosPrincipales();
    this.obtenerVariablesDelRouter(); 
    this.definirTituloFormulario();
    this.inicializarFormulario();  
    this.cargarLine();
  }

 
  
  private actualizarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateLine();
      return true;
    }
    return false;
  }
  
  private crearSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createLine();
      return true;
    }
    return false;
  }

  private eliminarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteLine();
      
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
    return this.LineForm.errors==null;
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

  deleteLine() {
    this.LineService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  createLine() {
    this.LineService.post(this.line).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }

  updateLine() {
    this.LineService.put(this.guid, this.line).subscribe(data => {
      this.gotoList();
    }, error => alert(error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORMULARIO_LISTA_LINES]);
  }

  get f() { 
    return this.LineForm.controls; 
  }


}


