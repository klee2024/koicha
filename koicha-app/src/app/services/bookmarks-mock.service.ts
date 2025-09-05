import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Product } from '../models/product';
import { MOCK_BOOKMARKS } from '../data/bookmarks.mock';

@Injectable({
  providedIn: 'root',
})
export class BookmarksMockService {
  constructor() {}

  getBookmarks(userId: string): Observable<Product[]> {
    // returns the ids of the products that the user has bookmarked
    return of(MOCK_BOOKMARKS).pipe(delay(200));
  }
}
