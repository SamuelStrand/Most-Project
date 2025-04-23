import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  setTokens(access: string, refresh: string): void {
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
  }

  setAccessToken(token: string): void {
    localStorage.setItem('access', token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }
  private BASE_URL = 'http://localhost:8000/api';

  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public loggedIn$ = this.loggedInSubject.asObservable();

  private hasToken(): boolean {
    return !!localStorage.getItem('access');
  }
  loginSuccess(): void {
    this.loggedInSubject.next(true);
  }

  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register/`, data);
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login/`, credentials).pipe(
      tap((response: any) => {
        this.setTokens(response.access, response.refresh);
      })
    );
  }
  isLoggedIn(): boolean {
    return this.loggedInSubject.value;
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.loggedInSubject.next(false);
  }
  
  getProfile(): Observable<any> {
    const token = localStorage.getItem('access');
    return this.http.get(`${this.BASE_URL}/me/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }
  refreshToken(): Observable<{ access: string }> {
    const refresh = this.getRefreshToken();
    if (!refresh) {
      this.logout();
      return throwError(() => new Error('No refresh token'));
    }

    return this.http.post<{ access: string }>(
      `${this.BASE_URL}/token/refresh/`,
      { refresh }
    ).pipe(
      tap(response => {
        console.log('Refresh token response:', response);
        this.setAccessToken(response.access);
      }),
      catchError(error => {
        console.error('Refresh token error:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }
}
