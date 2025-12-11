import { Injectable } from '@angular/core';
// TODO: Revisit mocks
// import {
//   MOCK_TASTE_PROFILE,
//   MOCK_TASTE_PROFILE_NO_DETAILS,
// } from '../data/taste-profile.mock';
import { TasteProfile } from '../models/taste-profile';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TasteProfileService {
  private readonly baseUrl = 'http://127.0.0.1:8000/api'; // e.g. 'http://localhost:8000/api/quiz'
  private appUrl = 'taste_profiles';

  constructor(private http: HttpClient) {}

  // TODO: make this dynamic to grab by the userId
  getUserTasteProfile(): Observable<TasteProfile> {
    return this.http.get<TasteProfile>(`${this.baseUrl}/${this.appUrl}/me`);
  }

  // TODO: remove after backend integration- this is just for testing purposes
  // getEmptyTasteProfileDetails(userId: string): Observable<TasteProfile> {
  //   return of(MOCK_TASTE_PROFILE_NO_DETAILS).pipe(delay(200));
  // }

  postFirstTimeQuizResults(userId: string, quizResults: string[]) {
    return of({ success: true }).pipe(delay(100));
  }
}
