import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import {
  HttpClient,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { AuthSignInPayload, AuthSignUpPayload } from '../models/auth';
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

  signIn(signInPayload: AuthSignInPayload) {
    // also add the token to local storage to read from
    this.http
      .post<{ access: string; refresh: string }>(
        `${this.baseUrl}/${this.authUrl}/token/`,
        signInPayload
      )
      .subscribe((response) => {
        localStorage.setItem('refresh', response.refresh);
        localStorage.setItem('access', response.access);
      });
  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
