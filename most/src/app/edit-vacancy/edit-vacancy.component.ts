import { Component } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-vacancy',
  standalone: true,
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css'],
  imports: [FormsModule, CommonModule]
})
export class EditVacancyComponent {
  vacancy$!: Observable<Vacancy>;

  constructor(
    private vacancyService: VacancyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vacancy$ = this.vacancyService.getVacancyById(id);
  }

  saveVacancy(vacancy: Vacancy) {
    console.log('Отправляемые данные:', JSON.stringify(vacancy));
    this.vacancyService.updateVacancy(vacancy).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        console.error('Полный ответ сервера:', err.error);
        alert('Ошибка сохранения: ' + JSON.stringify(err.error));
      }
    });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}