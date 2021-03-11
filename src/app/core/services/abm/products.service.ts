import { Product } from './../../models/Product';
import { ResponseAll } from './../../models/ResponseAll';
import { LoginService } from '../login.service';
import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({ providedIn: 'root' })
export class ProductsService{

  url: string;
  Products = [];
  token: string;
  barraDelPath = '/';
  auth = 'auth';

  constructor(private http: HttpClient) {
    this.url = environment.BASE_API_URL + environment.END_POINT_PRODUCTS
    //this.token =  LoginService.getToken();
  }

  getAll():Observable<ResponseAll>{
    const response = this.http.get<ResponseAll>(this.url)
    return response
  }

  getOne(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.get<Product>(url);
  }

  post(product: Product){
    const headers = { 'content-type': 'application/json'}  

    const productToPost= {...product}
    return this.http.post<Product>(this.url, productToPost,{'headers':headers});
  }

  put(guid: string, product: Product){
    const url = `${this.url}${this.barraDelPath}${guid}`
    
    console.log('este',product)
    return this.http.put<Product>(url, product);
  }

  delete(guid: string){
    const url = `${this.url}${this.barraDelPath}${guid}`
    return this.http.delete<Product>(url);
  }

  
}
