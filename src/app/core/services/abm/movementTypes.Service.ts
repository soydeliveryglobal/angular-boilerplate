import { MovementType } from './../../models/MovementType';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class MovementTypeService{

  url: string;
  MovementTypes = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_MOVEMENTTYPES
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<MovementType>(url);
  }

  post(movementType: MovementType){
    const headers = { 'content-type': 'application/json'}  

    const movementTypeToPost= {name:movementType.name,description:movementType.description}
    return this.http.post<MovementType>(this.url, movementTypeToPost,{'headers':headers});
  }

  put(guid: string, movementType: MovementType){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<MovementType>(url, movementType);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<MovementType>(url);
  }

  
}
