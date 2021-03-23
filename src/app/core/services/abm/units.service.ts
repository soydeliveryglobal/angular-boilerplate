
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Unit } from './../../models/Unit';


@Injectable({ providedIn: 'root' })
export class UnitsService{

  url: string;
  Units = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_UNITS
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Unit>(url);
  }

  post(unit: Unit){
    const headers = { 'content-type': 'application/json'}  

    const unitToPost= {name:unit.name,description:unit.description}
    return this.http.post<Unit>(this.url, unitToPost,{'headers':headers});
  }

  put(guid: string, unit: Unit){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<Unit>(url, unit);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Unit>(url);
  }

  
}
