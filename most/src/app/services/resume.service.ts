import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Resume {
  id: number;
  name: string;
  status: string;
  responses: number;
  role: string;
  lastUpdated: string;
  stats: {
    shows: number;
    views: number;
    invites: number;
  };
  vacancies: number;
}

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumes: Resume[] = [
    {
      id: 1,
      name: 'Иван Петров',
      status: 'Активен',
      responses: 5,
      role: 'Frontend-разработчик',
      lastUpdated: '2025-03-27',
      stats: { shows: 50, views: 20, invites: 5 },
      vacancies: 10
    }
  ];

  private resumesSubject = new BehaviorSubject<Resume[]>(this.resumes);
  resumes$ = this.resumesSubject.asObservable();

  getResumes(): Observable<Resume[]> {
    return this.resumes$;
  }

  addResume(resume: Resume): void {
    this.resumes.push(resume);
    this.resumesSubject.next([...this.resumes]); // Обновляем подписчиков
  }

  updateResume(resume: Resume): void {
    const index = this.resumes.findIndex(r => r.id === resume.id);
    if (index !== -1) {
      this.resumes[index] = resume;
      this.resumesSubject.next([...this.resumes]);
    }
  }

  deleteResume(id: number): void {
    this.resumes = this.resumes.filter(resume => resume.id !== id);
    this.resumesSubject.next([...this.resumes]);
  }
}
