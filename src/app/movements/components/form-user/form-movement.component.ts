import { MovementTypeService } from './../../../core/services/abm/movementTypes.Service';
import { MovementType } from 'src/app/core/models/movementType';
import { ProductsService } from './../../../core/services/abm/products.service';
import { Product } from './../../../core/models/Product';
import { Movement } from './../../../core/models/Movement';
import { I18nServiceService } from '../../../core/services/i18n/i18n-service.service';
import { TranslateService } from '@ngx-translate/core';
import { Component, Output, OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MovementsService } from 'src/app/core/services/abm/movements.service';
import { Depot } from 'src/app/core/models/Depot';
import { DepotsService } from 'src/app/core/services/abm/depots.services';
import { ResponseAll } from 'src/app/core/models/ResponseAll';
import { Unit } from 'src/app/core/models/Unit';
import { UnitsService } from 'src/app/core/services/abm/units.service';



@Component({
  selector: 'form-movement',
  templateUrl: './form-movement.component.html',
  styleUrls: ['./form-movement.scss'],
})
export class FormMovementComponent implements OnInit, OnDestroy {

  @Output() modelEmitter = new EventEmitter();
  submitted = false;
  MovementForm: FormGroup;
  formTitle: string;
  guid: string;
  mode: string;
  depots: Depot[];
  unities: Unit[];
  products: Product[];
  movementTypes: MovementType[];
  movement: Movement;
  insert = false;
  camposReadOnly = false;
  mySubscription: any;

  compareFn(c1: any, c2: any): boolean {
    return c1 && c2 ? Object.values(c1)[0] === Object.values(c2)[0] : c1 === c2;
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movementsService: MovementsService,
    private movementTypeService: MovementTypeService,
    private productService: ProductsService,
    private unitService: UnitsService,
    private depotsService: DepotsService,
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
    this.movement = new Movement();
    this.loadDepots();
    this.loadUnities();
    this.loadProducts();
    this.loadMovementTypes();
  }

  private loadDepots() {
    this.depotsService.getAll().subscribe((res: ResponseAll) => {
      this.depots = res.data;
    });
  }
  private loadUnities() {
    this.unitService
      .getAll(environment.EMPTY_QUERY)
      .subscribe((res: ResponseAll) => {
        this.unities = res.data;
      });
  }
  private loadProducts() {
    this.productService
      .getAll(environment.EMPTY_QUERY)
      .subscribe((res: ResponseAll) => {
        this.products = res.data;
      });
  }
  private loadMovementTypes() {
    this.movementTypeService
      .getAll(environment.EMPTY_QUERY)
      .subscribe((res: ResponseAll) => {
        this.movementTypes = res.data;
      });
  }

  private getVariablesFromRouter() {
    this.guid = this.route.snapshot.params[environment.PARAMETRO_RUTEO_GUID];
    this.mode = this.route.snapshot.params[environment.PARAMETRO_RUTEO_MODO];
  }

  private setFormTitle() {
    if (this.mode == environment.MODO_UPDATE) {
      this.formTitle = `${environment.DOMAIN_NAME_MOVEMENTS}.${environment.TITLE_FORM_UPDATE}`;
    } else if (this.mode == environment.MODO_CREATE) {
      this.formTitle = `${environment.DOMAIN_NAME_MOVEMENTS}.${environment.TITLE_FORM_CREATE}`;
      this.insert = true;
      this.guid = '';
    } else if (this.mode == environment.MODO_DISPLAY) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_MOVEMENTS}.${environment.TITLE_FORM_DISPLAY}`;
    } else if (this.mode == environment.MODO_DELETE) {
      this.camposReadOnly = true;
      this.formTitle = `${environment.DOMAIN_NAME_MOVEMENTS}.${environment.TITLE_FORM_DELETE}`;
    }
  }

  private initializeForm() {
    this.MovementForm = this.formBuilder.group({
      movementGUID: [''],
      details: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      unit: ['', [Validators.required]],
      product: ['', [Validators.required]],
      movementType: ['', [Validators.required]],
      enableIn: ['', [Validators.required]],
      enableOut: ['', [Validators.required]],
    });
  }

  private loadMovement() {
    if (this.guid != '') {
      this.movementsService.getOne(this.guid).subscribe(movement => {
        this.movement = movement;
      });
    } else {
    }
  }

  private start() {
    this.initializeMainObjects();
    this.getVariablesFromRouter();
    this.setFormTitle();
    this.initializeForm();
    this.loadMovement();
  }

  private updateIfIsMode(): boolean {
    if (this.mode == environment.MODO_UPDATE) {
      this.updateMovement();
      return true;
    }
    return false;
  }

  private createIfIsMode(): boolean {
    if (this.mode == environment.MODO_CREATE) {
      this.createMovement();
      return true;
    }
    return false;
  }

  private deleteIfIsMode(): boolean {
    if (this.mode == environment.MODO_DELETE) {
      this.deleteMovement();
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
    return this.MovementForm.valid;
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

  deleteMovement() {
    this.movementsService.delete(this.guid).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error));
  }

  createMovement() {
    this.movementsService.post(this.movement).subscribe((data) => {
        this.gotoList();
      }, error => alert());
  }

  updateMovement() {
    this.movementsService.put(this.guid, this.movement).subscribe(
      (data) => {
        this.gotoList();
      },
      (error) => alert(error.error)
    );
  }

  gotoList() {
    this.router.navigate([environment.FORM_LIST_MOVEMENTS]);
  }

  get f() {
    return this.MovementForm.controls;
  }


  onSelectedProduct(aProduct: Product){
    
    this.movement.product = aProduct;
  }


}
