import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Preparation, Product, Tag } from '../models/product';
import { MOCK_PRODUCTS } from '../data/product.mock';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly baseUrl = environment.apiBaseUrl; // e.g. 'http://localhost:8000/api/quiz'
  private readonly appUrl = 'products';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/${this.appUrl}/products/`);
  }

  getPreparations() {
    return this.http.get<Preparation[]>(
      `${this.baseUrl}/${this.appUrl}/preparations/`
    );
  }

  getTags() {
    return this.http.get<Tag[]>(`${this.baseUrl}/${this.appUrl}/tags/`);
  }
}
