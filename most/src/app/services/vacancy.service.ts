import { Injectable } from '@angular/core';
import {Vacancy} from '../shared/models/vacancy'
@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  constructor() { }
  getVacancyById(id:number):Vacancy {
    return this.getAll().find(vacancy => vacancy.id == id)!;
  }
  getAll():Vacancy[]{
    return[
      {
        id: 1,
        name: 'Administrator',
        salary:'from $1,000 per month before taxes.',
        Payments:'once a month',
        workexp:'not required',
        whours:8,
        favorite: false,
        imageUrl: '/food-1.jpeg',
        schedule: 4/2,
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
    ]
  }
}
