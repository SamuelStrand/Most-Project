import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {
  private vacancies: Vacancy[] = [
    {
      id: 1,
      name: 'Administrator',
      salary: 'from $1,000 per month before taxes.',
      Payments: 'once a month',
      workexp: 'not required',
      whours: 8,
      favorite: false,
      imageUrl: '/food-1.jpeg',
      schedule: 4 / 2,
      wformat: 'offline'
    },
    {
      id: 2,
      name: 'Teacher',
      salary:'85,000 - 250,000 ₸ per month, cash on hand',
      Payments:'once a month',
      workexp: 'not required',
      whours:8,
      favorite: false,
      imageUrl: '/food-2.jpg',
      schedule: 4/2,
      wformat: 'offline'
    },
    {
      id: 3,
      name: 'Sales Manager',
      salary:'300,000 - 1,000,000 ₸ per month, cash on hand',
      Payments:'once a month',
      workexp: 'not required',
      whours:8,
      favorite: true,
      imageUrl: '/food-3.jpg',
      schedule: 4/2,
      wformat: 'offline'
    },
    {
      id: 4,
      name: 'Chef',
      salary:'300,000 - 1,000,000 ₸ per month, cash on hand',
      Payments:'once a month',
      workexp: 'not required',
      whours:8,
      favorite: false,
      imageUrl: '/food-4.jpg',
      schedule: 4/2,
      wformat: 'offline'
    },
    {
      id: 5,
      name: "Kaspi's manager",
      salary:'From 200,000 ₸ per month, before taxes',
      Payments:'once a month',
      workexp: 'not required',
      whours:8,
      favorite: true,
      imageUrl: '/food-5.jpg',
      schedule: 4/2,
      wformat: 'offline'
    },
    {
      id: 6,
      name: 'Digital Manager',
      salary:'Income level not specified',
      Payments:'once a month',
      workexp: 'not required',
      whours:8,
      favorite: false,
      imageUrl: '/food-6.jpg',
      schedule: 4/2,
      wformat: 'offline'
    }
  ];
  toggleFavorite(id: number): void {
    const vacancy = this.vacancies.find(v => v.id === id);
    if (vacancy) {
      vacancy.favorite = !vacancy.favorite;
      this.saveToLocalStorage();
    }
  }
  getFavorites(): Vacancy[] {
    return this.vacancies.filter(v => v.favorite);
  } 
  getVacancies(): Vacancy[] {
    return this.vacancies;
  }
  private saveToLocalStorage(): void {
    localStorage.setItem('vacancies', JSON.stringify(this.vacancies));
  }
  constructor() { 
    const saved = localStorage.getItem('vacancies');
    if (saved) {
      this.vacancies = JSON.parse(saved);
    }
  }

  getVacancyById(id: number): Vacancy {
    return this.vacancies.find(vacancy => vacancy.id === id)!;
  }

  getAll(): Vacancy[] {
    return this.vacancies;
  }

  addVacancy(newVacancy: Vacancy): void {
    newVacancy.id = this.vacancies.length + 1;
    this.vacancies.push(newVacancy);
  }


  deleteVacancy(id: number): void {
    this.vacancies = this.vacancies.filter(vacancy => vacancy.id !== id);
  }

  updateVacancy(updatedVacancy: Vacancy): boolean {
    const index = this.vacancies.findIndex(v => v.id === updatedVacancy.id);
    if (index !== -1) {
      this.vacancies[index] = updatedVacancy;
      return true;
    }
    return false;
  }
}