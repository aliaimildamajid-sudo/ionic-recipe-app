// src/app/services/recipe.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary?: string;
  instructions?: string;
  extendedIngredients?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  // TheMealDB API 
  // External RESTAPI
  // API JSON > RECIPE INTERFACE
  
  private apiUrl = 'https://www.themealdb.com/api/json/v1/1'; 

  constructor(private http: HttpClient) { }

  searchRecipes(query: string): Observable<Recipe[]> {
    return this.http.get<any>(`${this.apiUrl}/search.php?s=${query}`).pipe(
      map(response => {
        if (!response.meals) return [];
        return response.meals.map((meal: any) => ({
          id: parseInt(meal.idMeal),
          title: meal.strMeal,
          image: meal.strMealThumb,
          readyInMinutes: 30,
          servings: 4,
          category: meal.strCategory,
          area: meal.strArea
        }));
      })
    );
  }

  getRecipeById(id: string): Observable<Recipe> {
    return this.http.get<any>(`${this.apiUrl}/lookup.php?i=${id}`).pipe(
      map(response => {
        const meal = response.meals[0];
        const ingredients = [];
        
        // Extract ingredients (TheMealDB has them as strIngredient1, strIngredient2, etc.)
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim()) {
            ingredients.push({
              name: ingredient,
              amount: measure
            });
          }
        }

        return {
          id: parseInt(meal.idMeal),
          title: meal.strMeal,
          image: meal.strMealThumb,
          readyInMinutes: 30,
          servings: 4,
          summary: `${meal.strCategory} dish from ${meal.strArea}`,
          instructions: meal.strInstructions,
          extendedIngredients: ingredients,
          category: meal.strCategory,
          area: meal.strArea,
          tags: meal.strTags,
          youtube: meal.strYoutube
        };
      })
    );
  }
}