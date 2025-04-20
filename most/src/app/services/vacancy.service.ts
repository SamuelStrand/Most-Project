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
  private apiUrl = 'http://localhost:8000/api/vacancies/'; // Жестко прописанный URL

  constructor(private http: HttpClient) { }

  // Получить все вакансии
  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl);
  }

  // Создать вакансию
  createVacancy(vacancy: Omit<Vacancy, 'id'>): Observable<Vacancy> {
    return this.http.post<Vacancy>(this.apiUrl, vacancy);
  }

  // Обновить вакансию
  updateVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.patch<Vacancy>(`${this.apiUrl}${vacancy.id}/`, vacancy);
  }

  // Удалить вакансию
  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${id}/`);
  }

  // Получить вакансию по ID
  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}${id}/`);
  }
  searchVacancies(term: string): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(`${this.apiUrl}?search=${term}`);
  }
  
}