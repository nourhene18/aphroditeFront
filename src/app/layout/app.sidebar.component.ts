import { Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, OnInit } from '@angular/core';
import { LayoutService } from "./service/app.layout.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../admin/auth.service';


@Component({
    selector: 'app-sidebar',
    templateUrl: './app.sidebar.component.html',
    standalone: true,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [FormsModule,CommonModule,RouterLink],
})
export class AppSidebarComponent implements OnInit {
    model: any[] = [];
    isAuth: boolean = false ; 
    constructor(public layoutService: LayoutService, public el: ElementRef, private router:Router) { }
    ngOnInit() {
    this.model = [
            {
              label: "Catégories",
              icon: "pi pi-fw pi-th-large",
              routerLink: "/aphrodite/category/add"
            },
            {
                label: "Produit",
                icon: "pi pi-fw pi-th-large",
                routerLink: "/aphrodite/products/add"
              }];
    }
    itemClick(item : any) {
     this.router.navigate([item]);
    }
    }

   



