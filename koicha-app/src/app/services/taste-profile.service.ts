import { Injectable } from '@angular/core';
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

  getDefaultTasteProfile(): Observable<TasteProfile> {
    return this.http.get<TasteProfile>(
      `${this.baseUrl}/${this.appUrl}/default`
    );
  }

  getUserTasteProfile(): Observable<TasteProfile> {
    return this.http.get<TasteProfile>(`${this.baseUrl}/${this.appUrl}/me`);
  }

  // TODO: update the user's taste profile from their review of a product
  // updateUserTasteProfile(tasteProfileUpdateRequest: TasteProfileRequest){
  // }
}
