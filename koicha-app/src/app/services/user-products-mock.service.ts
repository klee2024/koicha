import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { MOCK_BOOKMARKS } from '../data/bookmarks.mock';

@Injectable({
  providedIn: 'root',
})
export class UserProductsService {
  constructor() {}

  // BOOKMARK SERVICE
  createUserBookmark(userId: string, productId: string) {
    // adds a product to the user's list of bookmarks
    return of({ success: true }).pipe(delay(300));
  }

  getUserBookmarks(userId: string): Observable<Product[]> {
    return of(MOCK_BOOKMARKS).pipe(delay(300));
  }

  removeUserBookmark(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(300));
  }

  // TRACKING SERVICES
  addToUserTasteCount(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(100));
  }

  // TODO: delete if not used
  removeFromUserTasteCount(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(300));
  }

}
