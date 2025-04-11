import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { VacancyService } from '../services/vacancy.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  imports: [
    FormsModule
  ],
  styleUrl: './create-vacancy.component.css'
})
export class CreateVacancyComponent {
  newVacancy: Vacancy = {
    id: 0,
    name: '',
    salary: '',
    Payments: '',
    workexp: '',
    whours: 8,
    favorite: false,
    imageUrl: '',
    schedule: 4 / 2,
    wformat: 'offline',
  };

  constructor(private vacancyService: VacancyService) {}

  submitVacancy() {
    if (this.newVacancy.name && this.newVacancy.salary) {
      this.vacancyService.addVacancy(this.newVacancy);
      alert('Vacancy successfully added!');
      this.newVacancy = {
        id: 0,
        name: '',
        salary: '',
        Payments: '',
        workexp: '',
        whours: 8,
        favorite: false,
        imageUrl: '',
        schedule: 4 / 2,
        wformat: 'offline'
      };
    } else {
      alert('Please fill in all required fields!');
    }
  }
}
