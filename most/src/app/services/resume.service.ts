import { Injectable } from '@angular/core';
import { Resume } from '../shared/models/resume';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  private resumes: Resume[] = [];
  private idCounter = 1;

  getResumes(): Resume[] {
    return this.resumes;
  }

  getResumeById(id: number): Resume | undefined {
    return this.resumes.find((resume) => resume.id === id);
  }

  addResume(resume: Resume): void {
    resume.id = this.idCounter++;
    this.resumes.push(resume);
  }

  updateResume(updatedResume: Resume): boolean {
    const index = this.resumes.findIndex((r) => r.id === updatedResume.id);
    if (index !== -1) {
      this.resumes[index] = updatedResume;
      return true;
    }
    return false;
  }

  deleteResume(id: number): void {
    this.resumes = this.resumes.filter((resume) => resume.id !== id);
  }
}
