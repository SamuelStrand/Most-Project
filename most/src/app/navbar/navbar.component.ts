import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { AuthService } from '../services/auth.service'; // не забудь путь

import { CommonModule } from '@angular/common';  
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, SearchComponent, CommonModule, ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(value => {
      this.loggedIn = value;
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
