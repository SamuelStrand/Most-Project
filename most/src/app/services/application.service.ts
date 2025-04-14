import { Injectable } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private applicationsKey = 'job_applications';
  private applications: Vacancy[] = [];

  constructor() {
    this.loadApplications();
  }

  private loadApplications(): void {
    const storedApplications = localStorage.getItem(this.applicationsKey);
    this.applications = storedApplications ? JSON.parse(storedApplications) : [];
  }

  private saveApplications(): void {
    localStorage.setItem(this.applicationsKey, JSON.stringify(this.applications));
  }

  
applyForVacancy(vacancy: Vacancy): void {
  console.log('Applying for vacancy:', vacancy);
  if (!this.hasApplied(vacancy.id)) {
    this.applications.push(vacancy);
    this.saveApplications();
    console.log('Current applications:', this.applications);
  }
}

getApplications(): Vacancy[] {
  console.log('Getting applications from storage');
  return [...this.applications];
}

  hasApplied(vacancyId: number): boolean {
    return this.applications.some(app => app.id === vacancyId);
  }

  removeApplication(vacancyId: number): void {
    this.applications = this.applications.filter(app => app.id !== vacancyId);
    this.saveApplications();
  }
}