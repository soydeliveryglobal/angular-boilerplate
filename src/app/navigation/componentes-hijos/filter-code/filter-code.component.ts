import { Component, Output, OnInit, EventEmitter, ViewChild, Input } from '@angular/core';
import { ProductsService } from './../../../core/services/abm/products.service';
import { Product } from './../../../core/models/Product';
import { FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { I18nServiceService } from 'src/app/core/services/i18n/i18n-service.service';
import { MatSort } from '@angular/material/sort';
import { ResponseAll } from 'src/app/core/models/ResponseAll';
import { Movement } from 'src/app/core/models/Movement';
import { DtoProductModal } from '../products-modal/products-modal-dto';
import { ProductsModalComponent } from '../products-modal/products-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'filter-code',
  templateUrl: './filter-code.component.html',
  styleUrls: ['./filter-code.component.scss']
})
export class OneFilterCodeComponent implements OnInit{

  @ViewChild(MatSort) sort: MatSort;

  @Input() productIn: Product;
  @Output() productOut = new EventEmitter<Product>();
  product: Product;
  products: Product[];
  movement: Movement;
  MovementForm: FormGroup;
  codeinsert: string;
  dtoProduct = new DtoProductModal();

  constructor(
    private productService: ProductsService,
    private translate: TranslateService,
    private i18nService: I18nServiceService,
    private dialog: MatDialog

  ) {
    this.i18nService.localeEvent$.subscribe((locale) => {
        this.translate.use(locale);
      });
  }

  ngOnInit(): void {
    if(this.productIn != null){
        this.product = this.productIn;
    }

  }

  getOneProduct(){
    const queryCode = this.createCodeQuery();
    this.productService.getAll(queryCode).subscribe((res: ResponseAll) =>{
     this.products = res.data;
     this.product = this.products[0];
     this.productOut.emit(this.product);
    });
  }

  createCodeQuery(){
    let filters = '';
    this.codeinsert ? filters = `${filters}&storeCode=${this.codeinsert}` : null;
    return filters;
  }

  filterProd(){
    this.openDialog();
  }

  openDialog(): void {
    this.dtoProduct.readonly = false;
    const dialogRef = this.dialog.open(ProductsModalComponent,{ data:{dtoProductModal: this.dtoProduct}, width: '90vw', maxWidth: '90vw' });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });

    dialogRef.componentInstance.productsOut.subscribe(productsSelected => {
      console.log(this.product = productsSelected[0]);
      this.product = productsSelected[0];
      this.productOut.emit(this.product);
    });
  }

}
