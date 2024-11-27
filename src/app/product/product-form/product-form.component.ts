import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../models/product.service';
import { CategoryService } from '../../models/category.service';
import { Category } from '../../models/category';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ListboxModule } from 'primeng/listbox';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    DropdownModule,
    ButtonModule,
    CardModule,
    InputNumberModule,
    ToastModule,
    ListboxModule,
    NgFor
    
  ],
  providers: [MessageService],
})
export class ProductFormComponent implements OnInit {
  categories: Category[] = [];
  products: Product[] = [];
  filteredProducts: Product[] = [];
  product: Product = this.resetProduct();
  selectedProduct: Product | null = null;

  successMessage = '';
  errorMessage = '';
  searchTerm = '';
  searchTermMarque='';
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  private loadCategories(): void {
    this.categoryService.listeCategory().subscribe({
      next: (data) => (this.categories = data),
      error: (err) =>
        this.errorMessage = `Erreur lors du chargement des catégories : ${err.message}`,
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.products = data;
        this.filteredProducts = [...this.products];
      },
      error: (err) =>
        this.errorMessage = `Erreur lors du chargement des produits : ${err.message}`,
    });
  }

  filterProducts(): void {
    const search = this.searchTerm.trim().toLowerCase();
    this.filteredProducts = search
      ? this.products.filter(
          (p) =>
            p.name.toLowerCase().includes(search) 
        )
      : [...this.products];
  }
  filterMarqueProducts():void{
    const searchM = this.searchTermMarque.trim().toLowerCase();
    this.filteredProducts = searchM
      ? this.products.filter(
          (p) =>
            p.marque.toLowerCase().includes(searchM) 
        )
      : [...this.products];
  }
  selectProduct(product: Product): void {
this.product = {...product};
this.product.categorie = this.categories.find((cat)=>cat.nomCategorie == product.categorie?.nomCategorie);
  }

  saveProduct(): void {
    if (!this.product.name || !this.product.photoUrl || !this.product.categorie) {
      this.errorMessage = 'Tous les champs obligatoires doivent être remplis.';
      return;
    }

    this.selectedProduct ? this.updateProduct() : this.addProduct();
  }

  private addProduct(): void {
    this.productService.addProduct(this.product).subscribe({
      next: () => {
        this.successMessage = 'Produit ajouté avec succès.';
        this.refreshForm();
      },
      error: (err) =>
        this.errorMessage = `Erreur lors de l'ajout du produit : ${err.message}`,
    });
  }

  private updateProduct(): void {
    this.productService.updateProduct(this.product).subscribe({
      next: () => {
        this.successMessage = 'Produit modifié avec succès.';
        this.refreshForm();
      },
      error: (err) =>
        this.errorMessage = `Erreur lors de la modification du produit : ${err.message}`,
    });
  }

  confirmDeleteProduct(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.successMessage = 'Produit supprimé avec succès.';
          this.loadProducts();
        },
        error: (err) =>
          this.errorMessage = `Erreur lors de la suppression du produit : ${err.message}`,
      });
    }
  }

  
  private resetProduct(): Product {
    return {
      id: 0,
      name: '',
      photoUrl: '',
      prix: 0,
      marque: '',
      disponible: true,
      dateAjout: new Date(),
      commentaireList: [],
      description: '',
      categorie: undefined,
    };
  }

  private refreshForm(): void {
    this.clearMessages();
    this.loadProducts();
    this.product = this.resetProduct();
    this.selectedProduct = null;
  }

  private clearMessages(): void {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
