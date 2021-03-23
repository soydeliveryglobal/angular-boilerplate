import { Deposit } from './../../models/Deposit';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class DepositsService{

  url: string;
  Deposits = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_DEPOSITS
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Deposit>(url);
  }

  post(deposit: Deposit){
    const headers = { 'content-type': 'application/json'}  

    const depositToPost= {...deposit}
    console.log("ASd, ", depositToPost)
    return this.http.post<Deposit>(this.url, depositToPost,{'headers':headers});
  }

  put(guid: string, deposit: Deposit){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este',deposit)
    return this.http.put<Deposit>(url, deposit);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Deposit>(url);
  }

  
}
