import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeService } from '../services/resume.service';
import { Resume } from '../models/resume';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.css'],
})
export class ResumeFormComponent {
  resume: Resume = new Resume();
  editMode = false;

  constructor(
    private route: ActivatedRoute,
    private resumeService: ResumeService,
    private router: Router
  ) {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const existingResume = this.resumeService.getResumeById(+id);
      if (existingResume) {
        this.resume = { ...existingResume };
        this.editMode = true;
      }
    }
  }

  saveResume() {
    if (this.editMode) {
      this.resumeService.updateResume(this.resume);
    } else {
      this.resumeService.addResume(this.resume);
    }
    this.router.navigate(['/resumes']);
  }
}
