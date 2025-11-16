import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { MOCK_BOOKMARKS } from '../data/bookmarks.mock';
import { MOCK_REVIEWS } from '../data/reviews.mock';
import { UserReviewRequest } from '../models/review-request';

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

  // RATING SERVICES
  createUserProductReview(
    userId: string,
    productId: string,
    payload: UserReviewRequest
  ) {
    return of({ success: true }).pipe(delay(500));
  }

  // only gets the product reviews with the same preference from the backend
  getUserProductReviewsByPreference(preferenceEnumValue: number) {
    // TODO: this should just be a service call after backend is integrated
    return of(
      MOCK_REVIEWS.filter(
        (review) => review.reviewPreferenceValue == preferenceEnumValue
      )
    ).pipe(delay(200));
  }

  getUserProductReviews(userId: string) {
    return of(MOCK_REVIEWS).pipe(delay(200));
  }

  updateUserProductReview(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(200));
  }

  deleteUserProductReview(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(200));
  }
}
