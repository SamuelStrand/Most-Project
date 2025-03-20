import { Component } from '@angular/core';
<<<<<<< HEAD
import { RouterOutlet } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResumeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
=======
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  template: `
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule]
>>>>>>> 53976a4547a5393ebfa84cf2e2e86af233e6ff1d
})
export class AppComponent {}