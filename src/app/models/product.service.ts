import {  Injectable } from '@angular/core';
import { Product } from './product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire } from './commentaire';
const URL="http://localhost:8081/products";
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(URL);
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(URL, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${URL}/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${URL}`, product);
  }
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${URL}/${id}`);
  }
  addCommentaire(commentaire: Commentaire ,productId : number ): Observable<any> {
    return this.http.post(`${URL}/${productId}`, commentaire);
  }

  // Récupérer les commentaires pour un produit
  getCommentairesByProduitId(produitId: number): Observable<any[]> {
    return this.http.get<any[]>(`${URL}/${produitId}`);
  }
    
}
