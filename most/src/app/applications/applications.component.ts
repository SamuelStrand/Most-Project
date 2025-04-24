import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  imports: [CommonModule, RouterModule],
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class MyApplicationsComponent implements OnInit {
  applications: any[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.applicationService.getApplications().subscribe(data => {
      this.applications = data;
    });
  }

  removeApplication(id: number): void {
    this.applicationService.deleteApplication(id).subscribe(() => {
      this.applications = this.applications.filter(app => app.id !== id);
    });
  }

  apply(vacancyId: number): void {
    this.applicationService.createApplication(vacancyId).subscribe(response => {
      console.log('Application created:', response);
      this.ngOnInit();
    });
  }
}