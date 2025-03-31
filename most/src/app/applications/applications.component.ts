import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Vacancy } from '../shared/models/vacancy';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrl: './applications.component.css'
})
export class ApplicationsComponent implements OnInit {
  applications: Vacancy[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.applications = this.applicationService.getApplications();
    console.log('Loaded applications:', this.applications);
  }
}
