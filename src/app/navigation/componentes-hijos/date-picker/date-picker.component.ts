import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { environment } from 'src/environments/environment';
import { DtoDatePickerIn } from './DtoDatePickerIn';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';


@Component({
  selector: 'datepicker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],  
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: environment.LOCALE_STRING_DATEPICKER},
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
  ],
  
})


export class DatePickerComponent implements OnInit{
  @Input() dtoDatePickerIn: DtoDatePickerIn;
  @Output() datePickerOut = new EventEmitter<Date>();

  vFORMATEARFECHA: boolean;
  fecha: any;
  constructor(private _adapter: DateAdapter<any>) {}

  input: any;
  setDatepicker(val) {

    this.input = new Date(val);
    
  }

  ngOnInit(): void {
    this._adapter.setLocale(environment.LOCALE_STRING_DATEPICKER);
    this.throwErrorSiDoDatePickerInEsNulo();
    if (this.dtoDatePickerIn.fecha == null){
      this.fecha = new Date();
    }else{
      let ff =  this.dtoDatePickerIn.fecha;
      this.fecha = ff;
    }
  }


  addZero(i) {
    
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }
  
  seleccion(ype: string, event: MatDatepickerInputEvent<Date>){

    
    this.datePickerOut.emit(event.value);

  }

  

  private throwErrorSiDoDatePickerInEsNulo(){
    if (!this.dtoDatePickerIn){
    }
  }
  
   

   
}