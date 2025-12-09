import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { AuthSignInPayload, AuthSignUpPayload } from '../models/auth';
import { Observable, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly authUrl = 'auth';
  constructor(private http: HttpClient) {}

  signUp(signUpPayload: AuthSignUpPayload) {
    return this.http.post(
      `${this.baseUrl}/${this.authUrl}/signup/`,
      signUpPayload
    );
  }

  signIn(
    signInPayload: AuthSignInPayload
  ): Observable<{ access: string; refresh: string }> {
    return this.http
      .post<{ access: string; refresh: string }>(
        `${this.baseUrl}/${this.authUrl}/token/`,
        signInPayload
      )
      .pipe(
        tap(({ access, refresh }) => {
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);
        })
      );
  }

  signUpAndSignIn(signUpPayload: AuthSignUpPayload) {
    return this.signUp(signUpPayload).pipe(
      switchMap(() =>
        this.signIn({
          username: signUpPayload.username,
          password: signUpPayload.password,
        })
      )
    );
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
