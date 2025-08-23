import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Product } from '../models/product';
import { MOCK_PRODUCTS } from '../data/product.mock';

@Injectable({
  providedIn: 'root',
})
export class ProductMockService {
  constructor() {}

  getProducts(): Observable<Product[]> {
    // network delay
    return of(MOCK_PRODUCTS).pipe(delay(500));
  }

  getProductsById(id: number): Observable<Product | undefined> {
    return of(MOCK_PRODUCTS.find((p) => p.id === id)).pipe(delay(300));
  }
}
