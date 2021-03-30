
import { HttpErrorResponse } from '@angular/common/http';
import { Depot } from './../../../core/models/Depot';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DepotsService } from 'src/app/core/services/abm/depots.services';

@Component({
  selector: 'form-depot',
  templateUrl: './form-depot.component.html',
  styleUrls:['./form-depot.scss']
})


export class FormDepotComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  DepotForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  depot: Depot;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;


  compareFnBool(c1:any, c2: any): boolean {
    return c1 && c2 ? c1 == c2 : c1 == c2;
  }

  compareFn(c1:any, c2: any): boolean {
    return c1 && c2 ? Object.values(c1)[0] === Object.values(c2)[0] : c1 === c2;
  }


  
  constructor(private route: ActivatedRoute, 
              private router: Router,
              private depotsService: DepotsService,
              private formBuilder: FormBuilder,
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
    this.depot = new Depot();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_DEPOTS}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_DEPOTS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_DEPOTS}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_DEPOTS}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.DepotForm = this.formBuilder.group({
      depotGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      intelliCode: ['', [Validators.required]],
      enableIn: ['',],
      enableOut: ['']
    });
  }  

  private loadDepot(){
    if (this.guid != ""){ 
        this.depotsService.getOne(this.guid).subscribe(depot => {
        this.depot = depot;
      });
    }else{
      
    }
  }


  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();
    this.loadDepot();

  }

 
  
  private updateIfIsMode(): boolean{
    if (this.mode == environment.MODO_UPDATE){     
      this.updateDepot();
      return true;
    }
    return false;
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createDepot();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean{
    if (this.mode == environment.MODO_DELETE){      
      this.deleteDepot();
      
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
    return this.DepotForm.valid;
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

  deleteDepot() {
    this.depotsService.delete(this.guid).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  createDepot() {
    this.depotsService.post(this.depot).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }

  updateDepot() {
    this.depotsService.put(this.guid, this.depot).subscribe(data => {
      this.gotoList();
    }, error => alert(error.error));
  }
  
  gotoList() {
    this.router.navigate([environment.FORM_LIST_DEPOTS]);
  }

  get f() { 
    return this.DepotForm.controls; 
  }


}


