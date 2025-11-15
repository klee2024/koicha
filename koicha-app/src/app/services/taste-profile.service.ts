import { Injectable } from '@angular/core';
import {
  MOCK_TASTE_PROFILE,
  MOCK_TASTE_PROFILE_NO_DETAILS,
} from '../data/taste-profile.mock';
import { TasteProfile } from '../models/taste-profile';
import { delay, Observable, of } from 'rxjs';
import { MOCK_QUIZ_QUESTIONS } from '../data/form-questions.mock';

@Injectable({
  providedIn: 'root',
})
export class TasteProfileService {
  constructor() {}

  // TODO: make this dynamic to grab by the userId
  getTasteProfileByUserId(userId: string): Observable<TasteProfile> {
    return of(MOCK_TASTE_PROFILE).pipe(delay(200));
  }

  // TODO: remove after backend integration- this is just for testing purposes
  getEmptyTasteProfileDetails(userId: string): Observable<TasteProfile> {
    return of(MOCK_TASTE_PROFILE_NO_DETAILS).pipe(delay(200));
  }

  getQuizQuestions() {
    return of(MOCK_QUIZ_QUESTIONS).pipe(delay(300));
  }

  postFirstTimeQuizResults(userId: string, quizResults: string[]) {
    return of({ success: true }).pipe(delay(100));
  }
}
