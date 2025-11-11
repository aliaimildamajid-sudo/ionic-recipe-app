import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RecipeService, Recipe } from '../../services/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SearchPage {
  searchQuery: string = '';
  recipes: Recipe[] = [];
  isLoading: boolean = false;

  constructor(
    private recipeService: RecipeService,
    private router: Router
  ) {}

  searchRecipes() {
    if (!this.searchQuery.trim()) {
      return;
    }

    this.isLoading = true;
    this.recipeService.searchRecipes(this.searchQuery).subscribe({
      next: (data) => {
        this.recipes = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching recipes:', error);
        this.isLoading = false;
        alert('Error searching recipes. Please try again.');
      }
    });
  }

  viewRecipe(recipe: Recipe) {
    this.router.navigate(['/recipe-detail', recipe.id]);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}