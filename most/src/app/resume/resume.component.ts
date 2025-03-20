import { Component } from '@angular/core';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css']
})
export class ResumeComponent {
  profile = {
    name: 'Болат Кен',
    status: 'Не ищу работу',
    responses: 16,
    lastUpdated: '14 января 2025 в 06:20',
    role: 'Начинающий специалист',
    stats: { shows: 0, views: 0, invites: 0 },
    vacancies: 577
  };
}
