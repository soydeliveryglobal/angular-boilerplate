import { PopUpsLines } from './pop-ups-lines';
import { MatDialogRef } from '@angular/material/dialog';
import { LineService } from 'src/app/core/services/abm/lines.service';
import { Line } from './../../../core/models/Line';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output,OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-pop-up-lines',
  templateUrl: './pop-up-lines.component.html',
  styleUrls: ['./pop-up-lines.component.scss']
})
export class PopUpLinesComponent implements OnInit {

  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  LineForm: FormGroup;
  formTitle: string;
  guid:string;
  mode: string;
  line: Line;  
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  

  
  constructor(private route: ActivatedRoute, private router: Router,
              private LineService: LineService, private formBuilder: FormBuilder,
              private translate: TranslateService,
              private i18nService: I18nServiceService,
              private dialogref: MatDialogRef<PopUpsLines>){
      
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
    this.line = new Line();
  }

  private getVariablesFromRouter(){
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO]; 
  } 

  private  setFormTitle(){
    if (this.mode == environment.MODO_UPDATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_UPDATE}`;
    }
    else if (this.mode == environment.MODO_CREATE)
    {
      this.formTitle = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid=""
    }
    else if (this.mode == environment.MODO_DISPLAY)
    {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_DISPLAY}`;
    }
    else if (this.mode == environment.MODO_DELETE)
    {
      this.camposReadOnly = true;
      this.formTitle =  `${environment.DOMAIN_NAME_LINES}.${environment.TITLE_FORM_DELETE}`;
    }
  }
  
  
  private initializeForm(){
    this.LineForm = this.formBuilder.group({
      lineGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: ['', ],
      updatedOn: ['']
    });
  }  

  private loadLine(){
    if (this.guid != ""){ 
        this.LineService.getOne(this.guid).subscribe(line => {
        this.line = line;            
      });
    }else{
      
    }
    
  }
  
  private start(){
    this.initializeMainObjects();
    this.getVariablesFromRouter(); 
    this.setFormTitle();
    this.initializeForm();  
    this.loadLine();
  }
  
  private createIfIsMode(): boolean{
    if (this.mode == environment.MODO_CREATE){ 
      this.createLine();
      return true;
    }
    return false;
  }

  
  

  private isFormValid(): boolean{
    return this.LineForm.valid;
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

  

  createLine() {
    this.LineService.post(this.line).subscribe(data => {
      this.closeDialogo();
      this.ngOnInit();
    }, error => alert(error.error));
  }

 

  get f() { 
    return this.LineForm.controls; 
  }

  closeDialogo():void{
    this.dialogref.close();
  }
}
