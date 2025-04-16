// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router, RouterModule } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [ReactiveFormsModule, RouterModule, CommonModule],
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   form: FormGroup;
//   successMessage: string | null = null;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router
//   ) {
//     this.form = this.formBuilder.group({
//       name: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', Validators.required],
//       confirmPassword: ['', Validators.required]
//     });
//   }

//   ngOnInit(): void {}

//   submit(): void {
//     console.log('Registration submitted:', this.form.value);
//     this.successMessage = "You have successfully registered!";
//   }
// }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service'; // путь поправь под свой проект

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submit(): void {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.errorMessage = 'Форма некорректна или пароли не совпадают.';
      return;
    }

    const { name, email, password } = this.form.value;

    this.authService.register({
      username: name,
      email,
      password
    }).subscribe({
      next: () => {
        this.successMessage = 'Регистрация прошла успешно!';
        this.errorMessage = null;
        setTimeout(() => this.router.navigate(['/login']), 1500);
      },
      error: (err) => {
        this.successMessage = null;
        console.error('Ошибка:', err);
        this.errorMessage =
          err.error?.email?.[0] ||
          err.error?.username?.[0] ||
          err.error?.password?.[0] ||
          'Ошибка регистрации';
      }
    });
  }
}

