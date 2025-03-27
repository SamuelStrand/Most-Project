import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private fakeUser = { email: 'test@example.com', password: 'password123' };

  login(email: string, password: string): Observable<boolean> {
    if (email === this.fakeUser.email && password === this.fakeUser.password) {
      localStorage.setItem('access_token', 'fake-jwt-token');
      return of(true);
    }
    return of(false);
  }

  register(email: string, password: string): Observable<boolean> {
    this.fakeUser = { email, password };
    return of(true);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('access_token') !== null;
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }
}
