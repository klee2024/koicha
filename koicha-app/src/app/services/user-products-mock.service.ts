import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Product, Tag } from '../models/product';
import { MOCK_BOOKMARKS } from '../data/bookmarks.mock';
import { MOCK_REVIEWS } from '../data/reviews.mock';
import { UserReviewRequest } from '../models/review-request';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserProductsService {
  private readonly baseUrl = environment.apiBaseUrl; // e.g. 'http://localhost:8000/api/quiz'
  private readonly appUrlRecommendations = 'recommendations';

  constructor(private http: HttpClient) {}

  // BOOKMARK SERVICE
  // TODO: remove these after bookmark backend integration
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

  // TODO: test and implement this - param type should not be tag
  toggleBookmark(productId: number) {
    return this.http.put<Tag[]>(
      `${this.baseUrl}/${this.appUrlRecommendations}/${productId}/bookmark`,
      {}
    );
  }

  // TODO: implement get all user bookmarks route
  // getUserBookmarks(){

  // }

  // PRODUCT RECOMMENDATION SERVICE

  // TODO: implement get products with user's match percentages
  // getProductRecommendationsForUser() {}
}
