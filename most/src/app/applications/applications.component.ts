import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../services/application.service';
import { Vacancy } from '../shared/models/vacancy';
import { CommonModule } from '@angular/common';
@Component({
  imports: [CommonModule],
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  applications: Vacancy[] = [];

  constructor(private applicationService: ApplicationService) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.applications = this.applicationService.getApplications();
  }

  refreshApplications() {
    this.loadApplications();
  }
}