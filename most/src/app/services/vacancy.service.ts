import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private apiUrl = 'http://localhost:8000/api/vacancies/';
  private favoriteEndpoint = 'http://localhost:8000/api/favorites/';

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
    return this.http.put<Vacancy>(`${this.apiUrl}${vacancy.id}/`, vacancy, this.getAuthHeaders());
  }

  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`, this.getAuthHeaders());
  }

  searchVacancies(term: string): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}?search=${term}`, this.getAuthHeaders());
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.favoriteEndpoint, this.getAuthHeaders());
  }
  
  addToFavorites(vacancyId: number): Observable<any> {
    return this.http.post<any>(this.favoriteEndpoint, { vacancy: vacancyId }, this.getAuthHeaders());
  }
  
  removeFromFavorites(favoriteId: number): Observable<void> {
    return this.http.delete<void>(`${this.favoriteEndpoint}${favoriteId}/`, this.getAuthHeaders());
  }
  
  toggleFavorite(vacancyId: number, isFavorite: boolean, favoriteId?: number): Observable<any> {
    if (isFavorite && favoriteId) {
      return this.removeFromFavorites(favoriteId);
    } else {
      return this.addToFavorites(vacancyId);
    }
  }
}
