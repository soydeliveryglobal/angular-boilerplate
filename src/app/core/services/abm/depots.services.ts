import { Depot } from './../../models/Depot';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class DepotsService{

  url: string;
  Depots = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_DEPOTS
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Depot>(url);
  }

  post(depot: Depot){
    const headers = { 'content-type': 'application/json'}  

    const depotToPost= {...depot}
    console.log("ASd, ", depotToPost)
    return this.http.post<Depot>(this.url, depotToPost,{'headers':headers});
  }

  put(guid: string, depot: Depot){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este',depot)
    return this.http.put<Depot>(url, depot);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Depot>(url);
  }

  
}
