import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, of } from 'rxjs';
import {
  DISLIKED_SUBPREFERENCES,
  FINE_SUBPREFERENCES,
  LIKED_SUBPREFERENCES,
  REVIEW_PREFERENCES,
} from '../data/review-preferences.mock';
import {
  ReviewPreference,
  ReviewSubPreference,
} from '../models/review-preference';
import { ProductLineup } from '../components/create-review/create-review-card/product-lineup';
import { UserReviewRequest } from '../models/review-request';
import { MOCK_REVIEWS } from '../data/reviews.mock';
import { UserReview } from '../models/review';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ReviewService {
  constructor() {}

  private _preferences$ = new BehaviorSubject<ReviewPreference[]>([]);
  private _subPreferences$ = new BehaviorSubject<ReviewSubPreference[]>([]);

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
    this._preferences$.next(REVIEW_PREFERENCES);
    console.log('retrieving preferences: ', REVIEW_PREFERENCES);
  }

  getSubPreferenceBucket(mainPreferenceEnum: string): void {
    // get all of the sub preference buckets based on the enum value of the main preference bucket
    // MOCK DATA FOR NOW
    let MOCK_SUBPREFERENCE_DATA: ReviewSubPreference[] = [];
    switch (mainPreferenceEnum) {
      case 'DISLIKED':
        MOCK_SUBPREFERENCE_DATA = DISLIKED_SUBPREFERENCES;
        break;
      case 'FINE':
        MOCK_SUBPREFERENCE_DATA = FINE_SUBPREFERENCES;
        break;
      case 'LIKED':
        MOCK_SUBPREFERENCE_DATA = LIKED_SUBPREFERENCES;
        break;
    }
    this._subPreferences$.next(MOCK_SUBPREFERENCE_DATA);
  }

  // ==================
  // REVIEW CRUD
  // ==================

  createUserProductReview(
    userId: string,
    productId: string,
    payload: UserReviewRequest
  ) {
    return of({ success: true }).pipe(delay(500));
  }

  getUserProductReviewsByPreference(preferenceEnumValue: number) {
    return of(
      MOCK_REVIEWS.filter(
        (review) => review.reviewPreferenceValue === preferenceEnumValue
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

  // ==================
  // HELPER METHODS
  // ==================

  // TODO: implement this so it's more of a helper method rather than a data fetcher
  getProductLineup(
    ratingValue: number,
    productCurrentlyReviewing: Product
  ): ProductLineup[] {
    // get the user's reviews
    // TODO: consider doing this just by the preference
    const userReviews = MOCK_REVIEWS;
    // get the insertion point based on the userReviews
    const insertionIndex = this.findInsertionIndexDescendingBinary(
      userReviews,
      ratingValue
    );
    console.log('inserting reviewing product at: ', insertionIndex);
    const lineup = this.findProductLineupFromInsertionPoint(
      userReviews,
      insertionIndex,
      ratingValue,
      productCurrentlyReviewing
    );
    return lineup;
  }

  findInsertionIndexDescendingBinary(
    userReviews: UserReview[],
    newScore: number
  ): number {
    userReviews.sort((a, b) => b.userRating - a.userRating);
    console.log('user reviews: ', userReviews);
    let left = 0;
    let right = userReviews.length;

    while (left < right) {
      const mid = Math.floor((left + right) / 2);

      if (newScore >= userReviews[mid].userRating) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }
    return left;
  }

  // TODO: refactor this method for clarity
  findProductLineupFromInsertionPoint(
    userReviews: UserReview[],
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
      console.log('reviewIndexHigh, ', reviewIndexHigh);
      console.log('reviewIndexLow, ', reviewIndexLow);
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
      reviewIndexHigh < userReviews.length + 1
    ) {
      const highProduct: ProductLineup = this.buildProductLineup(
        reviewIndexHigh,
        highRankingIncrement,
        userReviews,
        reviewHighPosition
      );
      console.log('high product ', highProduct);
      productLineupList.push(highProduct);
    }

    if (
      reviewIndexLow != undefined &&
      reviewIndexLow < userReviews.length + 1
    ) {
      const lowProduct: ProductLineup = this.buildProductLineup(
        reviewIndexLow,
        lowRankingIncrement,
        userReviews,
        reviewLowPosition
      );
      console.log('low product ', lowProduct);
      productLineupList.push(lowProduct);
    }

    // sort the array at the end by the ProductRating
    productLineupList.sort((a, b) => b.productRating - a.productRating);
    return productLineupList;
  }

  buildProductLineup(
    index: number,
    productRankingIncrement: number,
    userReviews: UserReview[],
    productPosition: 'before' | 'after' | 'current'
  ): ProductLineup {
    return {
      productRanking: index + productRankingIncrement,
      productName: userReviews[index].productName,
      productBrand: userReviews[index].productBrand,
      productRating: userReviews[index].userRating,
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
      console.log('value', value);
      if (value < min) {
        min = value;
        console.log('min: ', min);
      }
      if (value > max) {
        max = value;
        console.log('max: ', max);
      }
    }
    // the value is a starting range - need to add 10 for the full range
    if (max != 100) {
      max += 10;
    }

    if (min == 10) {
      min = 0;
    }

    console.log({ min, max });
    return { min, max };
  }
}
