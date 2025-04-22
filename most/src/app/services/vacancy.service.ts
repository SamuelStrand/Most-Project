import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = 'http://localhost:8000/api/vacancies/';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('access');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  getAll(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }

  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}${id}/`, this.getAuthHeaders());
  }

  createVacancy(vacancy: Omit<Vacancy, 'id'>): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.apiUrl, vacancy, this.getAuthHeaders());
  }

  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.patch<Vacancy>(`${this.apiUrl}${vacancy.id}/`, vacancy, this.getAuthHeaders());
  }

  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, this.getAuthHeaders());
  }

  searchVacancies(term: string): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}?search=${term}`, this.getAuthHeaders());
  }

  // Можно реализовать позже
  getFavorites(): any[] {
    throw new Error('Method not implemented.');
  }

  toggleFavorite(id: number): void {
    throw new Error('Method not implemented.');
  }
}
