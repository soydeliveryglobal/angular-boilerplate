
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StateOfDocument } from './../../models/StateOfDocument';


@Injectable({ providedIn: 'root' })
export class StateOfDocumentsService{

  url: string;
  StateOfDocuments = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_STATEOFDOCUMENTS;
      // this.token =  LoginService.getToken();
  }

  getAll(query: string): Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`;
    const response = this.http.get<ResponseAll>(urlWithQuery);
    return response;
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.get<StateOfDocument>(url);
  }

  post(stateOfDocument: StateOfDocument){
    const headers = { 'content-type': 'application/json'}  ;

    const stateOfDocumentToPost = {name: stateOfDocument.name, description: stateOfDocument.description};
    return this.http.post<StateOfDocument>(this.url, stateOfDocumentToPost, { 'headers' : headers});
  }

  put(guid: string, stateOfDocument: StateOfDocument){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.put<StateOfDocument>(url, stateOfDocument);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`;
    return this.http.delete<StateOfDocument>(url);
  }

}
