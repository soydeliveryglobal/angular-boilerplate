import { Variety } from './../../models/Variety';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class  VarietiesService{

  url: string;
  Varieties = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_VARIETIES
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){ 
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get< Variety>(url);
  }

  post(variety:  Variety){
    const headers = { 'content-type': 'application/json'}  

    const varietyToPost= {name:variety.name,description:variety.description}
    return this.http.post< Variety>(this.url, varietyToPost,{'headers':headers});
  }

  put(guid: string, variety:  Variety){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put< Variety>(url, variety);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete< Variety>(url);
  }

  
}
