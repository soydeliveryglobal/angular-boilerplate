import { ResponseAll } from './../../models/ResponseAll';
import { Provider } from '../../models/Provider';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ProviderService{

  url: string;
  Provideres = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_PROVIDER
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
   
   /*  const httpOptions = {
      headers : new HttpHeaders(
        {auth: this.token}
      )
    }; */
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const httpOptions = {
      headers : new HttpHeaders(
        {auth: this.token}
      )
    };
    const url = this.url + this.barraDelPath +  guid;
    return this.http.get<Provider>(url, httpOptions);
  }

  post(provider: Provider){
    const httpOptions = {
      headers : new HttpHeaders(
        {auth: this.token}
      )
    };

    return this.http.post<Provider>(this.url, provider, httpOptions);
  }

  put(guid: string, provider: Provider){
    const httpOptions = {
      headers : new HttpHeaders(
        {auth: this.token}
      )
    };
    const url = this.url + this.barraDelPath +  guid;
    
    return this.http.put<Provider>(url, provider, httpOptions);
  }

  delete(guid: string){
    const httpOptions = {
      headers : new HttpHeaders(
        {auth: this.token}
      )
    };
    const url = this.url + this.barraDelPath +  guid;
    return this.http.delete<Provider>(url, httpOptions);
  }

  
}
