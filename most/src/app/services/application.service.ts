import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applications: Vacancy[] = [];

  constructor() {
    this.loadApplications();
  }

  applyForVacancy(vacancy: Vacancy) {
    if (!this.hasApplied(vacancy.id)) {
      this.applications.push(vacancy);
      this.saveApplications();
      console.log('Saved applications:', this.applications);
    }
  }

  getApplications(): Vacancy[] {
    const storedApplications = localStorage.getItem('applications');
    return storedApplications ? JSON.parse(storedApplications) : [];
  }

  hasApplied(vacancyId: number): boolean {
    return this.applications.some(app => app.id === vacancyId);
  }

  private saveApplications() {
    localStorage.setItem('applications', JSON.stringify(this.applications));
  }

  private loadApplications() {
    const storedApplications = localStorage.getItem('applications');
    this.applications = storedApplications ? JSON.parse(storedApplications) : [];
  }
}
