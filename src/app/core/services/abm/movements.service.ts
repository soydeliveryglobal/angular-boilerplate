import { Movement } from './../../models/Movement';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class MovementsService{

  url: string;
  Movements = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_MOVEMENT
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Movement>(url);
  }

  post(movement: Movement){
    const headers = { 'content-type': 'application/json'}  

    const movementToPost = {...movement}
    console.log( 'ASD' , movementToPost)
    return this.http.post<Movement>(this.url, movementToPost, { 'headers' : headers});
  }

  put(guid: string, movement: Movement){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este',movement)
    return this.http.put<Movement>(url, movement);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Movement>(url);
  }

  
}
