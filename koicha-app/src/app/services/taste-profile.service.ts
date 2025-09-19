import { Injectable } from '@angular/core';
import { MOCK_TASTE_PROFILE } from '../data/taste-profile.mock';
import { TasteProfile } from '../models/taste-profile';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasteProfileService {
  constructor() {}

  getTasteProfileByUserId(userId: string): Observable<TasteProfile> {
    return of(MOCK_TASTE_PROFILE).pipe(delay(200));
  }

  postFirstTimeQuizResults(userId: string, quizResults: string[]) {
    return of({ success: true }).pipe(delay(100));
  }
}
