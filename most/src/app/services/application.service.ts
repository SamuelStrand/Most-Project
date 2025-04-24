import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const API_URL = 'http://localhost:8000/api'; // замени на свой

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('access'); // или откуда ты хранишь токен
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getApplications(): Observable<any> {
    return this.http.get(`${API_URL}/applications/`, {
      headers: this.getAuthHeaders()
    });
  }

  createApplication(vacancyId: number): Observable<any> {
    return this.http.post(`${API_URL}/applications/`, {
      vacancy_id: vacancyId
    }, {
      headers: this.getAuthHeaders().set('Content-Type', 'application/json')
    });
  }
  applyForVacancy(vacancyId: number): Observable<any> {
    return this.createApplication(vacancyId);
  }

  deleteApplication(applicationId: number): Observable<any> {
    return this.http.delete(`${API_URL}/applications/${applicationId}/`, {
      headers: this.getAuthHeaders()
    });
  }

  hasApplied(vacancyId: number): Observable<boolean> {
    return this.getApplications().pipe(
      map((applications: any[]) => 
        applications.some(app => app.vacancy.id === vacancyId)
      )
    );
  }
}
