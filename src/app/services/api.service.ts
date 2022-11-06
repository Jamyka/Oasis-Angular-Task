import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}
  baseURI: string = 'https://dummyjson.com';
  getProducts() {
    return this.http.get<any>(`${this.baseURI}/products`);
    // return this.http.get<any>(`https://dummyjson.com/products`);
  }
  getProductById(id: any) {
    return this.http.get<any>(`${this.baseURI}/products/${id}`);
  }
  addProduct(data: any) {
    return this.http.post<any>(`${this.baseURI}/products/add`, data);
  }
  updateProduct(id: any, data: any) {
    return this.http.put<any>(`${this.baseURI}/products/${id}`, data);
  }
  deleteProduct(id: any) {
    return this.http.delete<any>(`${this.baseURI}/products/${id}`);
  }
}
