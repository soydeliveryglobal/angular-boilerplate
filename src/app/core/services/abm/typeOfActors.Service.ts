import { TypeOfActor } from './../../models/TypeOfActor';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class TypeOfActorService{

  url: string;
  TypeOfActors = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_TYPEOFACTORS
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<TypeOfActor>(url);
  }

  post(typeOfActor: TypeOfActor){
    const headers = { 'content-type': 'application/json'}  

    const typeOfActorToPost= {name:typeOfActor.name,description:typeOfActor.description}
    return this.http.post<TypeOfActor>(this.url, typeOfActorToPost,{'headers':headers});
  }

  put(guid: string, typeOfActor: TypeOfActor){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<TypeOfActor>(url, typeOfActor);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<TypeOfActor>(url);
  }

  
}
