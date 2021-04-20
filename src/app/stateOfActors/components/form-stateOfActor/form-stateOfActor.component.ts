import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { StateOfActorService } from 'src/app/core/services/abm/stateOfActors.service';
import { StateOfActor } from 'src/app/core/models/stateOfActor';
import { DtoDatePickerIn } from 'src/app/navigation/componentes-hijos/date-picker/DtoDatePickerIn';

@Component({
  selector: 'form-stateOfActor',
  templateUrl: './form-stateOfActor.component.html',
})
export class FormStateOfActorComponent implements OnInit, OnDestroy {
  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  StateOfActorForm: FormGroup;
  formTitle: string;
  guid: string;
  mode: string;
  stateOfActor: StateOfActor;
  insert = false;
  camposReadOnly = false;
  mySubscription: any;
  dtoDatePickerInCheckIn: DtoDatePickerIn;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private StateOfActorService: StateOfActorService,
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
    this.stateOfActor = new StateOfActor();
  }

  private getVariablesFromRouter() {
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO];
  }

  private setFormTitle() {
    if (this.mode == environment.MODO_UPDATE) {
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFACTORS}.${environment.TITLE_FORM_UPDATE}`;
    } else if (this.mode == environment.MODO_CREATE) {
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFACTORS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid = '';
    } else if (this.mode == environment.MODO_DISPLAY) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFACTORS}.${environment.TITLE_FORM_DISPLAY}`;
    } else if (this.mode == environment.MODO_DELETE) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_STATEOFACTORS}.${environment.TITLE_FORM_DELETE}`;
    }
  }

  private initializeForm() {
    this.StateOfActorForm = this.formBuilder.group({
      stateOfActorGUID: [''],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      createdOn: [''],
      updatedOn: [''],
    });
  }

  private loadStateOfActor() {
    if (this.guid != '') {
      this.StateOfActorService.getOne(this.guid).subscribe((stateOfActor) => {
        this.stateOfActor = stateOfActor;
      });
    } else {
    }
  }

  private start() {
    this.initializeMainObjects();
    this.getVariablesFromRouter();
    this.setFormTitle();
    this.initializeForm();
    this.loadStateOfActor();
  }

  private updateIfIsMode(): boolean {
    if (this.mode == environment.MODO_UPDATE) {
      this.updateStateOfActor();
      return true;
    }
    return false;
  }

  private createIfIsMode(): boolean {
    if (this.mode == environment.MODO_CREATE) {
      this.createStateOfActor();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean {
    if (this.mode == environment.MODO_DELETE) {
      this.deleteStateOfActor();

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
    return this.StateOfActorForm.valid;
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
      //alertify.alert(environment.VERIFIFICAR_FORM_INVALIDO);
      alert(environment.VERIFIFICAR_FORM_INVALIDO);
      return;
    }
    this.doCrudOperation();
  }

  deleteStateOfActor() {
    this.StateOfActorService.delete(this.guid).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error)
    );
  }

  createStateOfActor() {
    this.StateOfActorService.post(this.stateOfActor).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error)
    );
  }

  updateStateOfActor() {
    this.StateOfActorService.put(this.guid, this.stateOfActor).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error)
    );
  }

  gotoList() {
    this.router.navigate([environment.FORM_LIST_STATEOFACTORS]);
  }

  get f() {
    return this.StateOfActorForm.controls;
  }
}
