import { TypeOfDocument } from './../../models/TypeOfDocument';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class TypeOfDocumentService{

  url: string;
  TypeOfDocuments = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_TYPEOFDOCUMENTS
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<TypeOfDocument>(url);
  }

  post(typeOfDocument: TypeOfDocument){
    const headers = { 'content-type': 'application/json'}  

    const typeOfDocumentToPost= {name:typeOfDocument.name,description:typeOfDocument.description,regNumPathern:typeOfDocument.regNumPathern}
    return this.http.post<TypeOfDocument>(this.url, typeOfDocumentToPost,{'headers':headers});
  }

  put(guid: string, typeOfDocument: TypeOfDocument){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<TypeOfDocument>(url, typeOfDocument);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<TypeOfDocument>(url);
  }

  
}
