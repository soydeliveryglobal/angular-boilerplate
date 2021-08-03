import { Actor } from './../../models/Actor';
import { ResponseAll } from './../../models/ResponseAll';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ActorsService{

  url: string;
  Actors = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_ACTOR
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Actor>(url);
  }

  post(actor: Actor){
    const headers = { 'content-type': 'application/json'}  

    const actorToPost = {...actor}
    console.log( 'ASD' , actorToPost)
    return this.http.post<Actor>(this.url, actorToPost, { 'headers' : headers});
  }

  put(guid: string, actor: Actor){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este', actor)
    return this.http.put<Actor>(url, actor);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Actor>(url);
  }

  
}
