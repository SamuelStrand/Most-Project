import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
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
    return this.http.post(`${this.BASE_URL}/register/`, data); // ✅ тут return
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/login/`, {
      email: credentials.email,
      password: credentials.password
    });
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
}
