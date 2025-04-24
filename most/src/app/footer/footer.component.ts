import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  loggedIn = false;
  currentYear = new Date().getFullYear();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.loggedIn$.subscribe(status => {
      this.loggedIn = status;
    });
  }
}
