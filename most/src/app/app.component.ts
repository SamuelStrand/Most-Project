import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'], // Исправил на styleUrls
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    if (location.pathname === '/') {
      this.router.navigateByUrl('/home');
    }
  }
}
