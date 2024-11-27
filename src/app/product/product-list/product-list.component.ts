import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../models/product.service';
import { DataViewModule } from 'primeng/dataview';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [DataViewModule, CommonModule, ButtonModule, TableModule,FormsModule,CurrencyPipe,RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  layout: 'list' | 'grid' = 'grid';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = ''; 
  productService: ProductService = inject(ProductService);
  rating=4;
  searchTermMarque='';
  ngOnInit(): void {
    this.getProduits();
  }

  getProduits(): void {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }


  filterProducts(): void {
    let searchTermLower = this.searchTerm.toLowerCase();
    this.filteredProducts = this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTermLower)
    );
  }
  filterMarqueProducts():void{
    let searchM = this.searchTermMarque.trim().toLowerCase();
    this.filteredProducts = searchM
      ? this.products.filter(
          (p) =>
            p.marque.toLowerCase().includes(searchM) 
        )
      : [...this.products];
  }
}
