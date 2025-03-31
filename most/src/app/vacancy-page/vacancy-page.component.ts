import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { ApplicationService } from '../services/application.service';

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  imports: [RouterLink],
  styleUrl: './vacancy-page.component.css'
})
export class VacancyPageComponent {
  vacancy!: Vacancy;
  hasApplied: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private vacancyService: VacancyService,
    private applicationService: ApplicationService,
    private router: Router
  ) {
    activatedRoute.params.subscribe((params) => {
      if (params['id']) {
        const vacancy = this.vacancyService.getVacancyById(+params['id']);
        if (vacancy) {
          this.vacancy = vacancy;
          this.hasApplied = this.applicationService.hasApplied(vacancy.id);
        } else {
          console.error('Vacancy not found');
        }
      }
    });
  }

  applyForVacancy() {
    if (!this.hasApplied) {
      this.applicationService.applyForVacancy(this.vacancy);
      this.hasApplied = true;
    }
  }

  deleteVacancy() {
    if (confirm('Are you sure you want to delete this vacancy?')) {
      this.vacancyService.deleteVacancy(this.vacancy.id);
      this.router.navigate(['/']);
    }
  }
}
