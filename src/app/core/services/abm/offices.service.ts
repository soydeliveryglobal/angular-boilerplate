import { Office } from './../../models/Office';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class OfficeService{

  url: string;
  Offices = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_OFFICES;
     // this.token =  LoginService.getToken();
  }

  getAll(query: string): Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery);
    return response;
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.get<Office>(url);
  }

  post(office: Office){
    const headers = { 'content-type': 'application/json'};

    const officeToPost= {name:office.name,description:office.description};
    return this.http.post<Office>(this.url, officeToPost,{ 'headers' : headers});
  }

  put(guid: string, office: Office){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.put<Office>(url, office);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.delete<Office>(url);
  }
}
