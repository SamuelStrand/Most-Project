import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const token = localStorage.getItem('access');
  const cloned = token
    ? req.clone({ headers: req.headers.set('Authorization', `Bearer ${token}`) })
    : req;

  const http = inject(HttpClient);

  return next(cloned).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) return throwError(() => error);

        return http.post<{ access: string }>('http://localhost:8000/api/token/refresh/', { refresh }).pipe(
          switchMap(res => {
            localStorage.setItem('access', res.access);
            const retryReq = req.clone({
              headers: req.headers.set('Authorization', `Bearer ${res.access}`)
            });
            return next(retryReq);
          }),
          catchError(err => throwError(() => err))
        );
      }

      return throwError(() => error);
    })
  );
};
