import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, NgModule} from '@angular/core';
import { CategoryService } from '../../models/category.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-ajouter-category',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [FormsModule,CommonModule,InputTextModule],
  templateUrl: './ajouter-category.component.html',
  styleUrl: './ajouter-category.component.css'
})
export class AjouterCategoryComponent {
  nomCategorie:string="";
  description:string="";
categoryService:CategoryService=inject(CategoryService);
router:Router=inject(Router);
createCategory(){
  let newCategorie = {
    nomCategorie:this.nomCategorie,
    description:this.description
  }
  this.categoryService.ajouterCategory(newCategorie) ;
  console.log("categories ajouté ")
  this.router.navigate(["/aphrodite/products"]);
}
isNomCategorieInvalid(): boolean {
  return !this.nomCategorie || this.nomCategorie.trim().length === 0;
}

}
