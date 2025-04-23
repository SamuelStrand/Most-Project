import { Component, OnInit } from '@angular/core';
import { ResumeService, Resume } from '../services/resume.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-resume',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.css'],
})
export class ResumeComponent implements OnInit {
  isLoading = false;
  errorMessage: string | null = null;
  resume: Resume | null = null;
  isEditing = false;
  formData: Resume = {
    title: '',
    summary: '',
    experience: '',
    education: ''
  };

  constructor(
    private resumeService: ResumeService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadResume();
  }

  toggleCreateForm() {
    this.isEditing = !this.isEditing;
    if (this.isEditing) {
      this.formData = {
        title: '',
        summary: '',
        experience: '',
        education: ''
      };
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (this.isEditing && this.resume) {
      this.formData = { ...this.resume };
    }
  }

  submitForm() {
    this.isLoading = true;
    this.errorMessage = null;

    console.log('Sending resume data:', this.formData);

    this.resumeService.createResume(this.formData).subscribe({
      next: (newResume) => {
        console.log('Resume created successfully:', newResume);
        this.resume = newResume;
        this.isEditing = false;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error creating resume:', err);
        this.isLoading = false;
        
        if (typeof err === 'string') {
          this.errorMessage = err;
        } else if (err.error && typeof err.error === 'object') {
          let errorMsg = '';
          for (const field in err.error) {
            if (err.error.hasOwnProperty(field)) {
              errorMsg += `${field}: ${err.error[field].join(', ')}\n`;
            }
          }
          this.errorMessage = errorMsg || 'Form validation error';
        } else if (err.status === 400 && err.error?.detail) {
          this.errorMessage = err.error.detail;
        } else {
          this.errorMessage = 'An error occurred. Please try again later.';
        }
      }
    });
  }
  
  updateResume() {
    this.isLoading = true;
    this.errorMessage = null;
    
    if (!this.resume || !this.resume.id) {
      this.errorMessage = 'Cannot update: Resume ID not found';
      this.isLoading = false;
      return;
    }
    
    this.resumeService.updateResume(this.resume.id, this.formData).subscribe({
      next: (updatedResume) => {
        console.log('Resume updated successfully:', updatedResume);
        this.resume = updatedResume;
        this.isEditing = false;
        this.isLoading = false;
      },
      error: (err) => {
      }
    });
  }

  loadResume() {
    this.isLoading = true;
    this.resumeService.getMyResume().subscribe({
      next: (res) => {
        console.log('Resume loaded:', res);
        this.resume = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.log('Resume load error:', err);
        this.isLoading = false;
        if (err.status === 404) {
          this.resume = null;
        } else {
          this.errorMessage = 'Failed to load resume';
        }
      }
    });
  }
  deleteResume() {
    if (!this.resume || !this.resume.id) {
      this.errorMessage = 'Cannot delete: Resume ID not found';
      return;
    }
  
    if (confirm('Are you sure you want to delete your resume?')) {
      this.isLoading = true;
      this.resumeService.deleteResume(this.resume.id).subscribe({
        next: () => {
          console.log('Resume deleted successfully');
          this.resume = null;
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Error deleting resume:', err);
          this.isLoading = false;
          if (err.status === 401) {
            this.errorMessage = 'Authentication failed. Please log in again.';
          } else {
            this.errorMessage = 'Failed to delete resume. Please try again later.';
          }
        }
      });
    }
  }
}