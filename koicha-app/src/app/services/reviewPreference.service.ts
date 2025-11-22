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

@Injectable({
  providedIn: 'root',
})
export class ReviewPreferenceService {
  constructor() {}

  private _preferences$ = new BehaviorSubject<ReviewPreference[]>([]);
  private _subPreferences$ = new BehaviorSubject<ReviewSubPreference[]>([]);

  get preferences$(): Observable<ReviewPreference[]> {
    return this._preferences$.asObservable();
  }

  get subPreferences$(): Observable<ReviewSubPreference[]> {
    return this._subPreferences$.asObservable();
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
}
