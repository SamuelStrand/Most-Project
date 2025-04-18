import { Component, OnInit } from '@angular/core';
import { ResumeService, Resume } from '../services/resume.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],

})
export class ResumeComponent implements OnInit {
  resumes: any[] = []; // Хранение всех резюме
  profile: any = null; // Текущее выбранное резюме
  newRole: string = '';

  ngOnInit() {
    this.loadAllResumes();
  }

  constructor(private resumeService: ResumeService) {
    this.loadAllResumes();
  }


  loadAllResumes() {
    // Симуляция загрузки резюме (например, из LocalStorage или базы данных)
    /*
    this.resumes = [
      {
        id: 1,
        name: 'Иван Иванов',
        status: 'Активен',
        responses: 5,
        role: 'Frontend-разработчик',
        lastUpdated: 'Сегодня',
        stats: { shows: 10, views: 5, invites: 2 },
        vacancies: 3
      },
      {
        id: 2,
        name: 'Петр Петров',
        status: 'В поиске',
        responses: 2,
        role: 'Backend-разработчик',
        lastUpdated: 'Вчера',
        stats: { shows: 7, views: 3, invites: 1 },
        vacancies: 2
      }
    ];
    */
    const storedResumes = localStorage.getItem('resumes');
    this.resumes = storedResumes ? JSON.parse(storedResumes) : [];
  }


  //ngOnInit(): void {
  //  this.resumeService.getResumes().subscribe(resumes => {
  //    this.resumes = resumes;
  //    this.profile = resumes.length ? resumes[0] : null;
  //  });
  //}

  addResume() {
    if (!this.newRole.trim()) {
      alert('Введите роль перед добавлением резюме!');
      return;
    }

    const newResume = {
      id: Date.now(),
      name: 'Иван Петров',
      status: 'В поиске',
      responses: 0,
      role: this.newRole, // Используем введенную роль
      lastUpdated: new Date().toLocaleDateString(),
      stats: { shows: 0, views: 0, invites: 0 },
      vacancies: 0
    };

    this.resumes.push(newResume);
    this.saveResumes();
    this.newRole = ''; // Очищаем поле ввода
  }

  saveResumes() {
    localStorage.setItem('resumes', JSON.stringify(this.resumes));
  }


  updateResume(id: number): void {
    if (this.profile) {
      this.profile.lastUpdated = new Date().toISOString().split('T')[0];
      this.resumeService.updateResume(this.profile);
    }
  }

  deleteResume(id: number) {
    this.resumes = this.resumes.filter(resume => resume.id !== id);
    this.saveResumes(); // Сохранение изменений в localStorage
  }

}
