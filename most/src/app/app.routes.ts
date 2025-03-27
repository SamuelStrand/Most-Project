import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VacancyPageComponent } from './vacancy-page/vacancy-page.component';
import { ResumeComponent } from './resume/resume.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateVacancyComponent } from './create-vacancy/create-vacancy.component';
import { EditVacancyComponent } from './edit-vacancy/edit-vacancy.component';






export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'resume', component: ResumeComponent },
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'vacancy/:id', component: VacancyPageComponent},
  {path: 'login',component: LoginComponent},
  {path: 'register',component: RegisterComponent},
  { path: 'create-vacancy', component: CreateVacancyComponent },
  { path: 'edit-vacancy/:id', component: EditVacancyComponent }





];
