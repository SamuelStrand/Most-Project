import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,RouterModule],
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
    this.vacancyService.toggleFavorite(id);
  }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['searchTerm']) {
        this.vacancies = this.vacancyService.getAll().filter(vacancy =>
          vacancy.name.toLowerCase().includes(params['searchTerm'].toLowerCase())
        );
      } else {
        this.vacancies = this.vacancyService.getAll();
      }
    });

    console.log(this.vacancies);
  }
}