// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, ActivatedRoute, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterModule, CommonModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.css'
// })
// export class LoginComponent implements OnInit {
//   form: FormGroup;
//   success: string | null = null;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//     this.form = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {
//     const registrationSuccess = this.route.snapshot.queryParams['registrationSuccess'];
//     if (registrationSuccess) {
//       this.success = "Успешно зарегистрированы!";
//     }
//   }

//   submit(): void {
//     console.log('Форма отправлена:', this.form.value);
//   }
// }

//Bolat
// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.errorMessage = 'Пожалуйста, заполните все поля';
      return;
    }

    const { username, password } = this.form.value;

    this.authService.login({ username, password }).subscribe({
      next: (res: any) => {
        localStorage.setItem('access', res.access);
        localStorage.setItem('refresh', res.refresh);
        this.successMessage = 'Успешный вход!';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/dashboard']), 1000); // редирект на нужную страницу
      },
      error: (err) => {
        this.successMessage = null;
        this.errorMessage = err.error?.detail || 'Неверный логин или пароль';
      }
    });
  }
}


