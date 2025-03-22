import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { VacancyPageComponent } from './vacancy-page/vacancy-page.component';


export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  {path: 'search/:searchTerm', component:HomeComponent},
  {path: 'vacancy/:id', component: VacancyPageComponent}


];