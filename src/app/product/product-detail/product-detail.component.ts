import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../models/product.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentaireService } from '../../models/commentaire.service';
import { Commentaire } from '../../models/commentaire';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-detail.component.html',
  standalone:true,
  imports:[CardModule,ButtonModule,NgIf,NgFor,FormsModule],
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  productId!: number;
  newComment  : Commentaire = {
    nomUtilisateur: '',
    message: '',
  };

  commentaires: any[] = [];
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private commentaireService:CommentaireService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.productId = parseInt(params['id'], 10);
        this.getProductDetails();
      } else {
        console.error('Aucun ID trouvé dans les paramètres');
      }
    });
    this.loadCommentaires();
  }
  

  getProductDetails(): void {
    console.log('Fetching details for product ID:', this.productId); 
    this.productService.getProductById(this.productId).subscribe( {
    next:(product) => {
        console.log('Product retrieved:', product); 
        this.product = product;
      },
     error: (error) => {
        console.error('Error retrieving product:', error);
        alert('Le produit n\'a pas pu être récupéré');
      }
    }
    );
  }
  

  postComment() {
    if (this.newComment.nomUtilisateur && this.newComment.message) {
      this.commentaireService.addCommentaire(this.newComment, this.productId).subscribe(() => {
        this.loadCommentaires(); 
        this.newComment.message = ''; 
      });
    } else {
      alert('Veuillez remplir tous les champs.');
    }
  }

  loadCommentaires() {
    this.commentaireService.getCommentairesByProduitId(this.productId).subscribe((data) => {
      this.commentaires = data;
    });
  }
}
  

