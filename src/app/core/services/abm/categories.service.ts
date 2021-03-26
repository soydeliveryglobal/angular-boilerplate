import { Category } from './../../models/Category';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class CategoriesService{

  url: string;
  Categories = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_CATEGORIES
    //this.token =  LoginService.getToken();
  }

  getAll(query:string):Observable<ResponseAll>{
    const urlWithQuery = `${this.url}?${query}`
    const response = this.http.get<ResponseAll>(urlWithQuery)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Category>(url);
  }

  post(category: Category){
    const headers = { 'content-type': 'application/json'}  

    const categoryToPost= {name:category.name,description:category.description}
    return this.http.post<Category>(this.url, categoryToPost,{'headers':headers});
  }

  put(guid: string, category: Category){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    return this.http.put<Category>(url, category);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Category>(url);
  }

  
}
