import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Vacancy } from '../shared/models/vacancy';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];
  vacancyDetails: { [key: number]: Vacancy } = {};
  loading = false;

  constructor(private vacancyService: VacancyService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }
  
  loadFavorites(): void {
    this.loading = true;
    this.vacancyService.getFavorites().subscribe({
      next: (data) => {
        console.log('Favorites data:', data);
        this.favorites = data;
        this.loading = false;
        this.loadVacancyDetails();
      },
      error: (error) => {
        console.error('Error loading favorites:', error);
        this.loading = false;
      }
    });
  }
  
  loadVacancyDetails(): void {
    const requests: Observable<Vacancy>[] = this.favorites.map(favorite => 
      this.vacancyService.getVacancyById(favorite.vacancy).pipe(
        catchError(error => {
          console.error(`Error loading vacancy ${favorite.vacancy}:`, error);
          return of(null as any);
        })
      )
    );
    
    if (requests.length > 0) {
      forkJoin(requests).subscribe(vacancies => {
        vacancies.forEach((vacancy, index) => {
          if (vacancy) {
            const vacancyId = this.favorites[index].vacancy;
            this.vacancyDetails[vacancyId] = vacancy;
          }
        });
      });
    }
  }
  
  toggleFavorite(favoriteId: number, event: Event): void {
    event.stopPropagation();
    event.preventDefault();
    
    const favorite = this.favorites.find(f => f.id === favoriteId);
    if (favorite) {
      this.vacancyService.removeFromFavorites(favoriteId).subscribe({
        next: () => {
          this.favorites = this.favorites.filter(f => f.id !== favoriteId);
        },
        error: (error) => {
          console.error('Error removing favorite:', error);
        }
      });
    }
  }
}