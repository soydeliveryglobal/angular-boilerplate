import { StateOfActor } from './../../models/StateOfActor';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class StateOfActorService{

  url: string;
  StateOfActors = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_STATEOFACTORS
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<StateOfActor>(url);
  }

  post(stateOfActor: StateOfActor){
    const headers = { 'content-type': 'application/json'}  

    const stateOfActorToPost= {name:stateOfActor.name,description:stateOfActor.description}
    return this.http.post<StateOfActor>(this.url, stateOfActorToPost,{'headers':headers});
  }

  put(guid: string, stateOfActor: StateOfActor){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<StateOfActor>(url, stateOfActor);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<StateOfActor>(url);
  }

  
}
