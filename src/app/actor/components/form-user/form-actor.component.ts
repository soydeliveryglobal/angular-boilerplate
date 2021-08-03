import { StateOfActorService } from './../../../core/services/abm/stateOfActors.Service';
import { TypeOfActorService } from './../../../core/services/abm/typeOfActors.Service';
import { TypeOfActor } from './../../../core/models/TypeOfActor';
import { StateOfActor } from './../../../core/models/StateOfActor';
import { Actor } from './../../../core/models/Actor';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ActorsService } from 'src/app/core/services/abm/actor.service';
import { ResponseAll } from 'src/app/core/models/ResponseAll';



@Component({
  selector: 'form-actor',
  templateUrl: './form-actor.component.html',
  styleUrls: ['./form-actor.scss'],
})
export class FormActorComponent implements OnInit, OnDestroy {

  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  ActorForm: FormGroup;
  formTitle: string;
  guid: string;
  typeOfActors: TypeOfActor[];
  stateOfActors: StateOfActor[];
  mode: string;
  actor: Actor;
  insert = false;
  camposReadOnly = false;
  mySubscription: any;

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? Object.values(c1)[0] === Object.values(c2)[0] : c1 === c2;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private actorsService: ActorsService,
    private typeOfActorService: TypeOfActorService,    
    private stateOfActorService: StateOfActorService,
    private formBuilder: FormBuilder,
    private translate: TranslateService,
    private i18nService: I18nServiceService
  ) {
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

  private initializeMainObjects() {
    this.actor = new Actor();
    this.loadStateOfActor();
    this.loadTypeOfActor();
  
  }

  private loadTypeOfActor() {
    this.typeOfActorService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.typeOfActors = res.data;
    });
  }
  
  private loadStateOfActor() {
    this.stateOfActorService.getAll(environment.EMPTY_QUERY).subscribe((res: ResponseAll) => {
      this.stateOfActors = res.data;
    });
  }
  private getVariablesFromRouter() {
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO];
  }

  private setFormTitle() {
    if (this.mode == environment.MODO_UPDATE) {
      this.formTitle = `${environment.DOMAIN_NAME_ACTORS}.${environment.TITLE_FORM_UPDATE}`;
    } else if (this.mode == environment.MODO_CREATE) {
      this.formTitle = `${environment.DOMAIN_NAME_ACTORS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid = '';
    } else if (this.mode == environment.MODO_DISPLAY) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_ACTORS}.${environment.TITLE_FORM_DISPLAY}`;
    } else if (this.mode == environment.MODO_DELETE) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_ACTORS}.${environment.TITLE_FORM_DELETE}`;
    }
  }

  private initializeForm() {
    this.ActorForm = this.formBuilder.group({
      actorGuid: [''],
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      taxServiceNumber: ['', [Validators.required]],
      stateOfActor: ['', [Validators.required]],
      typeOfActor: ['', [Validators.required]],
    });
  }

  private loadActor() {
    if (this.guid != '') {
      this.actorsService.getOne(this.guid).subscribe(actor => {
        this.actor = actor;
      });
    } else {
    }
  }

  private start() {
    this.initializeMainObjects();
    this.getVariablesFromRouter();
    this.setFormTitle();
    this.initializeForm();
    this.loadActor();
  }

  private updateIfIsMode(): boolean {
    if (this.mode == environment.MODO_UPDATE) {
      this.updateActor();
      return true;
    }
    return false;
  }

  private createIfIsMode(): boolean {
    if (this.mode == environment.MODO_CREATE) {
      this.createActor();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean {
    if (this.mode == environment.MODO_DELETE) {
      this.deleteActor();
      return true;
    }
    return false;
  }

  private displayIfIsMode(): boolean {
    if (this.mode == environment.MODO_DISPLAY) {
      this.gotoList();
      return true;
    }
    return false;
  }

  private isFormValid(): boolean {
    return this.ActorForm.valid;
  }

  public doCrudOperation() {
    if (this.updateIfIsMode()) {
      return;
    }
    if (this.createIfIsMode()) {
      return;
    }
    if (this.deleteIfIsMode()) {
      return;
    }
    if (this.displayIfIsMode()) {
      return;
    }
  }

  public onSubmit() {
    this.submitted = true;

    if (!this.isFormValid()) {
      alert(environment.VERIFIFICAR_FORM_INVALIDO);
    }
    this.doCrudOperation();
  }

  deleteActor() {
    this.actorsService.delete(this.guid).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error));
  }

  createActor() {
    this.actorsService.post(this.actor).subscribe((data) => {
        this.gotoList();
      }, error => alert());
  }

  updateActor() {
    this.actorsService.put(this.guid, this.actor).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error)
    );
  }

  gotoList() {
    this.router.navigate([environment.FORM_LIST_ACTORS]);
  }

  get f() {
    return this.ActorForm.controls;
  }


 


}
