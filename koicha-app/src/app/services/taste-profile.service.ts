import { Injectable } from '@angular/core';
import { TasteProfile } from '../models/taste-profile';
import { delay, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TasteProfileService {
  private readonly baseUrl = environment.apiBaseUrl;
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
}
