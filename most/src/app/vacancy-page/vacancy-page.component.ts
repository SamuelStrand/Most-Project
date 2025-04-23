import { Component } from '@angular/core';
import { Vacancy } from '../shared/models/vacancy';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { VacancyService } from '../services/vacancy.service';
import { ApplicationService } from '../services/application.service';
import { Observable, switchMap } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-vacancy-page',
  templateUrl: './vacancy-page.component.html',
  imports: [RouterLink, FormsModule, CommonModule],
    styleUrl: './vacancy-page.component.css'
})
export class VacancyPageComponent {
  vacancy$: Observable<Vacancy>;
  hasApplied: boolean = false;
  favorites: any[] = [];
  favoriteId: number | null = null;
  constructor(
    private activatedRoute: ActivatedRoute,
    private vacancyService: VacancyService,
    private applicationService: ApplicationService,
    private router: Router
  ) {
    this.vacancy$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = +params['id'];
        return this.vacancyService.getVacancyById(id);
      })
    );
    this.activatedRoute.params.subscribe(params => {
      const id = +params['id'];
      this.hasApplied = this.applicationService.hasApplied(id);
    });
  }
  ngOnInit() {
    this.loadFavorites();
  }
  loadFavorites() {
    this.vacancyService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
      this.vacancy$.subscribe(vacancy => {
        const favorite = this.favorites.find(f => f.vacancy.id === vacancy.id);
        if (favorite) {
          this.favoriteId = favorite.id;
        }
      });
    });
  }
  
  toggleFavorite(vacancy: Vacancy, event: Event) {
    event.stopPropagation();
    event.preventDefault();
    
    const isFavorite = !!this.favoriteId;
    
    this.vacancyService.toggleFavorite(vacancy.id, isFavorite, this.favoriteId || undefined).subscribe({
      next: (response) => {
        if (isFavorite) {
          this.favoriteId = null;
        } else {
          this.favoriteId = response.id;
        }
      },
      error: (error) => {
        console.error('Error toggling favorite:', error);
      }
    });
  }
  applyForVacancy(vacancy: Vacancy) {
    console.log('Applying for:', vacancy);
    if (!this.hasApplied) {
      this.applicationService.applyForVacancy(vacancy);
      console.log('After apply:', this.applicationService.getApplications());
      this.hasApplied = true;
    }
  }

  deleteVacancy(vacancy: Vacancy) {
    if (confirm('Are you sure you want to delete this vacancy?')) {
      this.vacancyService.deleteVacancy(vacancy.id).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Error deleting vacancy:', err);
        }
      });
    }
  }
}