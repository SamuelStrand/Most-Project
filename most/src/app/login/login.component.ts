
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Please fill in all fields correctly';
      return;
    }


    this.authService.login({
      email: this.form.value.email,
      password: this.form.value.password
    }).subscribe({
      next: (res) => {
        localStorage.setItem('access', res.access);
    localStorage.setItem('refresh', res.refresh);
    this.authService.loginSuccess();
    this.router.navigate(['/resume']);

      },
      error: (err) => {
        this.errorMessage = err.error?.detail || 'Invalid email or password';
        
      this.successMessage = null;
      this.errorMessage = err.error?.detail || 'Invalid email or password';
      }
    });
  }
}


