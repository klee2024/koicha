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

  /**
   * Sends a sign-up request to the authentication service.
   *
   * @param signUpPayload - The payload containing the user's sign-up information.
   * @returns An Observable that emits the server's response to the sign-up request.
   */
  signUp(signUpPayload: AuthSignUpPayload) {
    return this.http.post(
      `${this.baseUrl}/${this.authUrl}/signup/`,
      signUpPayload
    );
  }

  /**
   * Sends a sign-in request to the authentication service.
   *
   * @param signUpPayload - The payload containing the user's sign-in information.
   * @returns An Observable that emits the server's response to the sign-in request with the access and refresh token
   */
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

  /**
   * Registers a new user and automatically signs them in using their credentials.
   *
   * This method first sends a sign-up request to create a new user account.
   * Upon successful sign-up, it immediately sends a sign-in request using the
   * provided username and password to authenticate the user.
   *
   * @param signUpPayload - The payload containing the user's sign-up information.
   * @returns An Observable that emits the server's response to the sign-in request with the access and refresh tokens.
   */
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

  /**
   * Removes the user's credentials from local storage to perform the "log out"
   *
   */
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }
}
