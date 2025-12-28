import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const access = localStorage.getItem('access');

    const authReq = access
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${access}`,
          },
        })
      : req;

    return next.handle(authReq).pipe(
      catchError((error) => {
        // TODO: update this logic after implementing token refresh
        // if there's an expired auth token, remove
        // the access tokens and retry the request
        if (error.status === 401) {
          this.authService.logout();
          return next.handle(req);
        }

        return throwError(() => error);
      })
    );
  }
}
