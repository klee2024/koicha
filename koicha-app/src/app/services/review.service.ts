import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, map, Observable, of, tap } from 'rxjs';
import {
  ReviewPreference,
  ReviewSubPreference,
} from '../models/review-preference';
import { ProductLineup } from '../components/create-review/create-review-card/product-lineup';
import { Review, UserReviewRequest } from '../models/review';
import { Product } from '../models/product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  private readonly baseUrl = environment.apiBaseUrl; // e.g. 'http://localhost:8000/api/quiz'
  private readonly appUrl = 'reviews';

  constructor(private http: HttpClient) {}

  private _preferences$ = new BehaviorSubject<ReviewPreference[]>([]);
  private _subPreferences$ = new BehaviorSubject<ReviewSubPreference[]>([]);
  private _userReviews$ = new BehaviorSubject<Review[]>([]);

  get userReviews$(): Observable<Review[]> {
    return this._userReviews$.asObservable();
  }

  get preferences$(): Observable<ReviewPreference[]> {
    return this._preferences$.asObservable();
  }

  get subPreferences$(): Observable<ReviewSubPreference[]> {
    return this._subPreferences$.asObservable();
  }

  get subPreferences() {
    return this._subPreferences$.value;
  }

  getPreferenceBuckets(): void {
    this.http
      .get<ReviewPreference[]>(
        `${this.baseUrl}/${this.appUrl}/review-preferences/`
      )
      .subscribe({
        next: (preferences) => this._preferences$.next(preferences ?? []),
        error: (error) => {
          console.error('Failed to load review preferences', error);
          this._preferences$.next([]);
        },
      });
  }

  getSubPreferenceBuckets(preference: ReviewPreference): void {
    const preferences = this._preferences$.value;
    if (!preferences.length) {
      this._subPreferences$.next([]);
      return;
    }

    const matchedPreference = preferences.find(
      (pref) => pref.bucket === preference.bucket
    );

    const subpreferences = matchedPreference?.subpreferences ?? [];
    this._subPreferences$.next(subpreferences);
  }

  // ==================
  // REVIEW CRUD
  // ==================

  createUserProductReview(payload: UserReviewRequest) {
    // creates the user product review on the backend
    // update the user's taste profile
    return this.http.post<UserReviewRequest>(
      `${this.baseUrl}/${this.appUrl}/`,
      payload
    );
  }

  // Gets the requesting user's product reviews, sorted by the user's rating descending
  getUserProductReviews() {
    const cached = this._userReviews$.value;

    return this.http
      .get<Review[]>(`${this.baseUrl}/${this.appUrl}/me/`)
      .pipe(tap((reviews) => this._userReviews$.next(reviews ?? [])));
  }
  // TODO POST-MVP: backend integration
  updateUserProductReview(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(200));
  }

  // TODO POST-MVP: backend integration
  deleteUserProductReview(userId: string, productId: string) {
    return of({ success: true }).pipe(delay(200));
  }

  // ==================
  // HELPER METHODS
  // ==================

  // TODO: implement this so it's more of a helper method rather than a data fetcher
  getProductLineup(
    ratingValue: number,
    productCurrentlyReviewing: Product
  ): Observable<ProductLineup[]> {
    return this.getUserProductReviews().pipe(
      map((userReviews) => {
        const insertionIndex = this.findInsertionIndexDescendingBinary(
          userReviews,
          ratingValue
        );
        return this.findProductLineupFromInsertionPoint(
          userReviews,
          insertionIndex,
          ratingValue,
          productCurrentlyReviewing
        );
      })
    );
  }

  findInsertionIndexDescendingBinary(
    userReviews: Review[],
    newScore: number
  ): number {
    userReviews.sort((a, b) => b.user_rating - a.user_rating);
    let left = 0;
    let right = userReviews.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (newScore >= userReviews[mid].user_rating) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  // TODO: refactor this method for clarity
  findProductLineupFromInsertionPoint(
    userReviews: Review[],
    insertionIndex: number,
    newRating: number,
    productCurrentlyReviewing: Product
  ): ProductLineup[] {
    // if there's no higher products, then show two lowest
    // if there's no lower product, then show two before
    // if this is the first product, then return just the current product
    // also address only two products
    // if this is the first product, then return just the current product

    let reviewIndexHigh = undefined;
    let reviewHighPosition: 'before' | 'current' | 'after' = 'before'; // set one as default
    let highRankingIncrement = 0; // the amount to push the ranking value down after the insertion
    let reviewIndexLow = undefined;
    let reviewLowPosition: 'before' | 'current' | 'after' = 'after'; // set one as default
    let lowRankingIncrement = 0; // the amount to push the ranking value down after the insertion

    // if the top (first product), then get the two products below (two after)
    if (insertionIndex == 0) {
      reviewIndexHigh = insertionIndex;
      reviewIndexLow = insertionIndex + 1; // higher rated because it's a lower index
      highRankingIncrement = 1;
      lowRankingIncrement = 1;
      reviewHighPosition = reviewLowPosition = 'after';
    }
    // if the bottom (last product), then get the two products above (two before)
    else if (insertionIndex == userReviews.length) {
      reviewIndexLow = userReviews.length - 1;
      reviewIndexHigh = userReviews.length - 2;
      reviewHighPosition = reviewLowPosition = 'before';
    }
    // if the middle, then get one higher one lower
    else {
      reviewIndexHigh = insertionIndex - 1;
      reviewIndexLow = insertionIndex;
      lowRankingIncrement = 1;
      reviewHighPosition = 'before';
      reviewLowPosition = 'after';
    }

    const currentProduct: ProductLineup = {
      // override userRanking depending on the overall product lineup
      productRanking: insertionIndex,
      productName: productCurrentlyReviewing.name,
      productBrand: productCurrentlyReviewing.brand,
      productRating: newRating,
      productPosition: 'current',
    };

    const productLineupList: ProductLineup[] = [currentProduct];

    if (
      reviewIndexHigh != undefined &&
      reviewIndexHigh >= 0 &&
      reviewIndexHigh < userReviews.length
    ) {
      const highProduct: ProductLineup = this.buildProductLineup(
        reviewIndexHigh,
        highRankingIncrement,
        userReviews,
        reviewHighPosition
      );
      productLineupList.push(highProduct);
    }

    if (
      reviewIndexLow != undefined &&
      reviewIndexLow >= 0 &&
      reviewIndexLow < userReviews.length
    ) {
      const lowProduct: ProductLineup = this.buildProductLineup(
        reviewIndexLow,
        lowRankingIncrement,
        userReviews,
        reviewLowPosition
      );
      productLineupList.push(lowProduct);
    }

    // sort the array at the end by the ProductRating
    productLineupList.sort((a, b) => b.productRating - a.productRating);
    return productLineupList;
  }

  buildProductLineup(
    index: number,
    productRankingIncrement: number,
    userReviews: Review[],
    productPosition: 'before' | 'after' | 'current'
  ): ProductLineup {
    return {
      productRanking: index + productRankingIncrement,
      productName: userReviews[index].product.name,
      productBrand: userReviews[index].product.brand,
      productRating: userReviews[index].user_rating,
      productPosition: productPosition,
    };
  }

  getSubPreferencesValueRange(): Record<string, number> {
    const subPreferences = this._subPreferences$.value;
    if (!subPreferences?.length) {
      return {};
    }

    // overriden by min and max determination, min can never be lower than 0
    // and max can never be over 100
    let min = 100;
    let max = 0;
    for (const { value } of subPreferences) {
      if (value < min) {
        min = value;
      }
      if (value > max) {
        max = value;
      }
    }
    // the value is a starting range - need to add 10 for the full range
    if (max != 100) {
      max += 10;
    }

    if (min == 10) {
      min = 0;
    }

    return { min, max };
  }

  // when passed in the ratingValue, gets the bucket that the rating preference belongs in
  findBucketForRating(ratingValue: number): ReviewSubPreference | undefined {
    const subPreferences = this._subPreferences$.value;
    if (!subPreferences?.length) return undefined;

    // ensure sorted by value (safe even if already sorted)
    const sorted = [...subPreferences].sort((a, b) => a.value - b.value);

    const idx = sorted.findIndex((bucket, i) => {
      const next = sorted[i + 1];
      return next
        ? ratingValue >= bucket.value && ratingValue < next.value
        : ratingValue >= bucket.value; // last bucket
    });

    return idx === -1 ? sorted[0] : sorted[idx];
  }
}
