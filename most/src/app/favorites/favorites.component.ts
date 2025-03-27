import { Component, OnInit } from '@angular/core';
import { VacancyService } from '../services/vacancy.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favorites: any[] = [];

  constructor(private vacancyService: VacancyService) {}

  ngOnInit(): void {
    this.favorites = this.vacancyService.getFavorites();
  }
  
  toggleFavorite(id: number, event: Event): void {
    event.stopPropagation();
    this.vacancyService.toggleFavorite(id);
    this.favorites = this.vacancyService.getFavorites();
  }
}