import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Commentaire } from './commentaire';

@Injectable({
  providedIn: 'root',
})
export class CommentaireService {
  private apiUrl = 'http://localhost:8081/commentaires'; 

  constructor(private http: HttpClient) {}

  addCommentaire(commentaire: Commentaire,produitId:number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${produitId}`, commentaire);
  }

  getCommentairesByProduitId(produitId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${produitId}`);
  }
}