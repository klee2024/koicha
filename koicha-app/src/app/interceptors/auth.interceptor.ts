import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
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
        // if there's an expired auth token, remove
        // the access tokens and retry the request
        if (error.status === 401 && access) {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          return next.handle(req);
        }

        return throwError(() => error);
      })
    );
  }
}
