// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private fakeUser = { email: 'test@example.com', password: 'password123' };

//   login(email: string, password: string): Observable<boolean> {
//     if (email === this.fakeUser.email && password === this.fakeUser.password) {
//       localStorage.setItem('access_token', 'fake-jwt-token');
//       return of(true);
//     }
//     return of(false);
//   }

//   register(email: string, password: string): Observable<boolean> {
//     this.fakeUser = { email, password };
//     return of(true);
//   }

//   isAuthenticated(): boolean {
//     return localStorage.getItem('access_token') !== null;
//   }

//   logout(): void {
//     localStorage.removeItem('access_token');
//   }
// }

// Bolat : 
// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private BASE_URL = 'http://localhost:8000/api';

  constructor(private http: HttpClient) {}

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users/register/`, data); // ✅ тут return
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.BASE_URL}/users/login/`, {
      email: credentials.email,
      password: credentials.password
    });
  }
  
  getProfile(): Observable<any> {
    const token = localStorage.getItem('access');
    return this.http.get(`${this.BASE_URL}/users/me/`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
