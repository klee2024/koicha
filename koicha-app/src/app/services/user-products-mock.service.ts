import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserBookmark } from '../models/bookmark';

@Injectable({
  providedIn: 'root',
})
export class UserProductsService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly appUrl = 'user_engagement';

  constructor(private http: HttpClient) {}

  // ---------------- BOOKMARK SERVICE ------------------------

  // get all of the requesting user's bookmarks
  getUserBookmarks(): Observable<UserBookmark[]> {
    return this.http.get<UserBookmark[]>(
      `${this.baseUrl}/${this.appUrl}/products/bookmarks/me/`
    );
  }

  toggleBookmark(productId: number) {
    return this.http.put<{ bookmarked: boolean }>(
      `${this.baseUrl}/${this.appUrl}/products/${productId}/bookmark/`,
      { product: productId }
    );
  }
}
