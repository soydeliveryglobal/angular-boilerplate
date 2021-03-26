import { User } from './../../models/User';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class UsersService{

  url: string;
  Users = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_USERS
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<User>(url);
  }

  post(user: User){
    const headers = { 'content-type': 'application/json'}  

    const userToPost= {...user}
    console.log("ASd, ", userToPost)
    return this.http.post<User>(this.url, userToPost,{'headers':headers});
  }

  put(guid: string, user: User){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este',user)
    return this.http.put<User>(url, user);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<User>(url);
  }

  
}
