import { Component } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-vacancy',
  standalone: true,
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css'],
  imports: [NgIf, NgFor, FormsModule]
})
export class EditVacancyComponent {
  vacancy!: Vacancy;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vacancy = this.vacancyService.getVacancyById(id);
  }

  saveVacancy() {
    this.vacancyService.updateVacancy(this.vacancy);
    this.router.navigate(['/']);
  }
}
