import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
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