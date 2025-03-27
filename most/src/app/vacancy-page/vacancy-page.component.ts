import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  styleUrl: './vacancy-page.component.css'
})
export class VacancyPageComponent {
  vacancy!: Vacancy;

  constructor(private activatedRoute: ActivatedRoute, private vacancyService: VacancyService) {
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
}
