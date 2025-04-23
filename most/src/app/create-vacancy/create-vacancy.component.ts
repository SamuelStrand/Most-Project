import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { VacancyService } from '../services/vacancy.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-vacancy',
  templateUrl: './create-vacancy.component.html',
  styleUrls: ['./create-vacancy.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class CreateVacancyComponent {
  newVacancy: Omit<Vacancy, 'id'> = {
    name: '',
    salary: '',
    payments: '',
    workexp: '',
    whours: 8,
    favorite: false,
    imageUrl: '',
    schedule: 4 / 2,
    wformat: 'offline'
  };

  constructor(
    private vacancyService: VacancyService,
    private router: Router
  ) {}

  submitVacancy() {
    if (this.newVacancy.name && this.newVacancy.salary) {
      this.vacancyService.createVacancy(this.newVacancy).subscribe({
        next: (response) => {
          console.log('Vacancy created: ', response);
          alert('Vacancy successfully added!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error ', err);
          alert('Error when creating a vacancy:' + err.error?.message);
        }
      });
    } else {
      alert('Fill in the mandatory fields: title and salary');
    }
  }
}