import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

export interface Resume {
  id?: number;
  user?: number;
  title: string;
  summary: string;
  experience: string;
  education: string;
  updated_at?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = 'http://localhost:8000/api/resumes/';

  constructor(private http: HttpClient,  private authService: AuthService) {}

  getResumes(): Observable<Resume[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    return this.http.get<Resume[]>(this.apiUrl, { headers });
  }

  getMyResume(): Observable<Resume> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
  
    return this.http.get<Resume>(`${this.apiUrl}me/`, { headers }).pipe(
      tap(response => console.log('Raw response from getMyResume:', response)),
      catchError(error => {
        console.error('Error getting resume:', error);
        if (error.status === 401) {
          return this.authService.refreshToken().pipe(
            switchMap(() => this.getMyResume())
          );
        }
        return throwError(() => error);
      })
    );
  }

  createResume(resume: Resume): Observable<Resume> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<Resume>(this.apiUrl, resume, { headers }).pipe(
      catchError(error => {
        console.error('Create resume error:', error);
        return throwError(() => error);
      })
    );
  }


  updateResume(id: number, resume: Resume): Observable<Resume> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`,
      'Content-Type': 'application/json'
    });

    console.log(`Sending PUT request to ${this.apiUrl}${id}/`);
    console.log('Update data:', resume);

    return this.http.put<Resume>(`${this.apiUrl}${id}/`, resume, { headers }).pipe(
      catchError(error => {
        console.error('Update resume error:', error);
        return throwError(() => error);
      })
    );
  }

  deleteResume(id: number): Observable<void> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getAccessToken()}`
    });
    return this.http.delete<void>(`${this.apiUrl}${id}/`, { headers });
  }
}