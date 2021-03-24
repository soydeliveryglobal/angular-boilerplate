import { Profile } from './../../models/Profile';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ProfileService{

  url: string;
  Profiles = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_PROFILE
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Profile>(url);
  }

  post(profile: Profile){
    const headers = { 'content-type': 'application/json'}  

    const profileToPost= {name:profile.name,description:profile.description}
    return this.http.post<Profile>(this.url, profileToPost,{'headers':headers});
  }

  put(guid: string, profile: Profile){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<Profile>(url, profile);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Profile>(url);
  }

  
}
