import { Family } from './../../models/Family';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class FamiliesService{

  url: string;
  Families = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_FAMILIES
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Family>(url);
  }

  post(family: Family){
    const headers = { 'content-type': 'application/json'}  

    const familyToPost= {name:family.name,description:family.description}
    return this.http.post<Family>(this.url, familyToPost,{'headers':headers});
  }

  put(guid: string, family: Family){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<Family>(url, family);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Family>(url);
  }

  
}
