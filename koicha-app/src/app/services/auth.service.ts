import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthSignInPayload, AuthSignUpPayload } from '../models/auth';
import {
  BehaviorSubject,
  catchError,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { User } from '../models/User';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly authUrl = 'auth';

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Gets if the user is signed in or not based off of the user field
   * @returns Observable boolean if the user is authenticated
   */
  isAuthenticated$(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  /**
   * Gets if the user is signed in or not via backend auth/me endpoint
   * Sets the user to the behavior subject
   * @returns An Observable of the user
   */
  checkAuth(): Observable<User | null> {
    return this.http.get<User>(`${this.baseUrl}/${this.authUrl}/me/`).pipe(
      tap((user) => this.userSubject.next(user)),
      catchError(() => {
        this.userSubject.next(null);
        return of(null);
      })
    );
  }

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
  ): Observable<{ access: string; refresh: string; user: User }> {
    return this.http
      .post<{ access: string; refresh: string; user: User }>(
        `${this.baseUrl}/${this.authUrl}/token/`,
        signInPayload
      )
      .pipe(
        tap(({ access, refresh, user }) => {
          localStorage.setItem('access', access);
          localStorage.setItem('refresh', refresh);
          this.userSubject.next(user);
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
   * Uses the stored refresh token to obtain a new access token.
   * Updates localStorage with the new tokens on success.
   *
   * @returns An Observable that emits the new access token string.
   */
  refreshToken(): Observable<string> {
    const refresh = localStorage.getItem('refresh');
    return this.http
      .post<{ access: string }>(
        `${this.baseUrl}/${this.authUrl}/token/refresh/`,
        { refresh }
      )
      .pipe(
        tap(({ access }) => {
          localStorage.setItem('access', access);
        }),
        map(({ access }) => access)
      );
  }

  /**
   * Removes the user's credentials from local storage to perform the "log out"
   *
   */
  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.userSubject.next(null);
  }
}
