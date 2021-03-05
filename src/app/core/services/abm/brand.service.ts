import { Brand } from './../../models/Brand';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class BrandService{

  url: string;
  Brands = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_BRANDS
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Brand>(url);
  }

  post(profile: Brand){
    const headers = { 'content-type': 'application/json'}  

    const profileToPost= {name:profile.name,description:profile.description}
    return this.http.post<Brand>(this.url, profileToPost,{'headers':headers});
  }

  put(guid: string, profile: Brand){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<Brand>(url, profile);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Brand>(url);
  }

  
}
