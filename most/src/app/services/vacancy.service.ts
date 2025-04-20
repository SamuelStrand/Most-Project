import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  getFavorites(): any[] {
    throw new Error('Method not implemented.');
  }
  getAll(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }
  toggleFavorite(id: number) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8000/api/vacancies/';

  constructor(private http: HttpClient) { }
  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }
  createVacancy(vacancy: Omit<Vacancy, 'id'>): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.apiUrl, vacancy);
  }
  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.patch<Vacancy>(`${this.apiUrl}${vacancy.id}/`, vacancy);
  }
  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }
  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}${id}/`);
  }
  searchVacancies(term: string): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}?search=${term}`);
  }
  
}