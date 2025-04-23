// auth.interceptor.ts
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError, filter, take, BehaviorSubject } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<string | null>(null);

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const accessToken = authService.getAccessToken();

  console.log('Intercepting request to:', req.url);
  console.log('Current access token:', accessToken);

  const authReq = addTokenToRequest(req, accessToken);

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      console.log('Interceptor error:', error.status, error.url);
      
      if (error.status !== 401 || req.url.includes('/token/')) {
        return throwError(() => error);
      }
      
      console.log('Attempting token refresh...');
      return handle401Error(authReq, next, authService);
    })
  );
};

const addTokenToRequest = (
  req: HttpRequest<unknown>,
  token: string | null
): HttpRequest<unknown> => {
  return token 
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
};

const handle401Error = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  authService: AuthService
): Observable<HttpEvent<unknown>> => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap(({ access }) => {
        console.log('Token refresh successful, new token:', access);
        isRefreshing = false;
        authService.setAccessToken(access);
        refreshTokenSubject.next(access);
        
        const retryReq = addTokenToRequest(req, access);
        console.log('Retrying original request:', retryReq.url);
        return next(retryReq);
      }),
      catchError((error) => {
        console.error('Token refresh failed:', error);
        isRefreshing = false;
        authService.logout();
        return throwError(() => error);
      })
    );
  }

  return refreshTokenSubject.pipe(
    filter((access): access is string => access !== null),
    take(1),
    switchMap(access => {
      const retryReq = addTokenToRequest(req, access);
      console.log('Retrying queued request:', retryReq.url);
      return next(retryReq);
    })
  );
};