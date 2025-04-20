import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  vacancies: Vacancy[] = [];

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute
  ) {}

  toggleFavorite(id: number, event: Event): void {
    event.stopPropagation();
    const vacancy = this.vacancies.find(v => v.id === id);
    if (vacancy) {
      vacancy.favorite = !vacancy.favorite;
      this.vacancyService.updateVacancy(vacancy).subscribe();
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.vacancyService.getAll().subscribe(vacancies => {
        if (params['searchTerm']) {
          this.vacancies = vacancies.filter(vacancy =>
            vacancy.name.toLowerCase().includes(params['searchTerm'].toLowerCase())
          );
        } else {
          this.vacancies = vacancies;
        }
      });
    });
  }
}