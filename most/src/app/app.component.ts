import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { NavbarComponent } from './navbar/navbar.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ResumeComponent, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  template: `
  <nav>
    <div class="header">
      <a routerLink="/home">Home</a>
      <a routerLink="/about">About</a>
    </div>
  </nav>
  <hr />
  <router-outlet></router-outlet>
`,
})
export class AppComponent {}
