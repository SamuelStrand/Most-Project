import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  imports: [
    RouterLink
  ],
  styleUrl: './vacancy-page.component.css'
})
export class VacancyPageComponent {
  vacancy!: Vacancy;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vacancyService: VacancyService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const vacancy = this.vacancyService.getVacancyById(+params['id']);
        if (vacancy) {
          this.vacancy = vacancy;
        } else {
          console.error('Vacancy not found');
        }
      }
    });
  }

  deleteVacancy() {
    if (confirm('Are you sure you want to delete this vacancy?')) {
      this.vacancyService.deleteVacancy(this.vacancy.id);
      this.router.navigate(['/']);
    }
  }

  updateVacancy() {
    const newName = prompt('Enter new vacancy name:', this.vacancy.name);
    if (newName) {
      const updatedVacancy = { ...this.vacancy, name: newName };
      if (this.vacancyService.updateVacancy(updatedVacancy)) {
        this.vacancy = updatedVacancy;
      } else {
        alert('Error updating vacancy!');
      }
    }
  }
}
