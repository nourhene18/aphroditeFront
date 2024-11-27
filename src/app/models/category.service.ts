import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from './category';
const URL="http://localhost:8081";
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  http:HttpClient=inject(HttpClient);

  listeCategory(): Observable<Category[]> {
    return this.http.get<Category[]>( URL+"/categories");
  }

  ajouterCategory(categorie:Category)   {
    console.log("test",categorie)
     this.http.post<Category>(URL+"/categories",categorie)
     .subscribe({
      next: (response) => console.log('Category added:', response),
      error: (err) => console.error('Error adding category:', err)
    });
  }
}
