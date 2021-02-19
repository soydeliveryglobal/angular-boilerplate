import { environment } from 'src/environments/environment';
import { AdministradorService } from 'src/app/core/services/administrador.service';
import { Administrador } from 'src/app/core/models/Administrator';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as EventEmitter from 'events';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ValidarPassword } from './validador-password';

@Component({
  selector: 'app-miabmform',
  templateUrl: './miabmform.component.html',
  styleUrls: ['./miabmform.component.scss']
})
export class MiabmformComponent implements OnInit {

  @Output() modelEmitter = new EventEmitter();
  environment = environment
  submitted = false;
  administradorForm: FormGroup;
  tituloformulario: string;
  id: number;
  mode: string;
  administrador: Administrador;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  
  constructor(private route: ActivatedRoute, private router: Router,
              private administradorService: AdministradorService, private formBuilder: FormBuilder){
      
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
    this.administrador = new Administrador();
  }

  private obtenerVariablesDelRouter(){
    this.id = this.route.snapshot.params[environment.PARAMETRO_RUTEO_ID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  definirTituloFormulario(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.tituloformulario = environment.TITLE_FORM_UPDATE + environment.NOMBRE_DOMINIO_ADMINISTRADOR;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.tituloformulario = environment.TITLE_FORM_CREATE + environment.NOMBRE_DOMINIO_ADMINISTRADOR;
      this.insert = true;
      this.administrador.id = 0;
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.tituloformulario = environment.TITLE_FORM_DISPLAY + environment.NOMBRE_DOMINIO_ADMINISTRADOR;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.tituloformulario =  environment.TITLE_FORM_DELETE  + environment.NOMBRE_DOMINIO_ADMINISTRADOR;
    }
  }
  
  private validarPassword():boolean{
    return this.insert;

  }
  private inicializarFormulario(){
    this.administradorForm = this.formBuilder.group({
      id: [0, [Validators.required]],
      nombre: ['', [Validators.required]],
      email: ['', [Validators.required,Validators.email]],
      password: ['', [Validators.required,this.requiredIfValidator(() => this.insert)]],
      essuperadministrador: ['',],
      passwordconfirm:  ['', [Validators.required, this.requiredIfValidator(() => this.validarPassword())]]
    }, {
      validator: ValidarPassword('passwordconfirm','password', this.validarPassword())
    });
  }  

  private cargarAdministrador(){
    if (this.id != 0){ 
      this.administradorService.getOne(this.id).subscribe(administrador => {
      this.administrador = administrador;
      });
    }
  }
  
  private iniciar(){
    this.inicializarObjetosPrincipales();
    this.obtenerVariablesDelRouter(); 
    this.definirTituloFormulario();
    this.inicializarFormulario();  
    this.cargarAdministrador();
  }

  requiredIfValidator(predicate) {
   
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl); 
      }
      return null;
    })
  }
  
  private actualizarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateAdministrador();
      return true;
    }
    return false;
  }
  
  private crearSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_CREATE){     
      this.createAdministrador();
      return true;
    }
    return false;
  }

  private eliminarSiCorrespondeModo(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteAdministrador();
      
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
    return !this.administradorForm.invalid;
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

  deleteAdministrador() {
    this.administradorService.delete(this.id).subscribe(data => {
      this.gotoList();
    });
  }

  createAdministrador() {
    this.administradorService.post(this.administrador).subscribe(data => {
      this.gotoList();
    });
  }

  updateAdministrador() {
    this.administradorService.put(this.id, this.administrador).subscribe(data => {
      this.gotoList();
    });
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_CRUD_MI_ABM]);
  }

  get f() { 
    return this.administradorForm.controls; 
  }


}
