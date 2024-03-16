import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/products';
  private categoriesUrl = 'https://fakestoreapi.com/products/categories';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
  getProductById(id: number): Observable<Product> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Product>(url);
  }
  getProductsByUrl(url: string): Observable<Product[]> {
    return this.http.get<Product[]>(url);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(this.categoriesUrl);
  }
}
