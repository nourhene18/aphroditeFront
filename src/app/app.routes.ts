import { RouterModule, Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/app.layout.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { LoginComponent } from './admin/login/login.component';
import { ProductFormComponent } from './product/product-form/product-form.component';
import { NgModule } from '@angular/core';
import { RoleGuardService } from './admin/role-guard.service';
import { UnauthorizedComponent } from './admin/login/unauthorized.component';
import { AppTopBarNotAuthComponent } from './layout/topbar-not-auth';
import { AjouterCategoryComponent } from './categorie/ajouter-category/ajouter-category.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { InfosComponent } from './infos/infos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path:'',
    component: AppTopBarNotAuthComponent,
    children:[
      { path: '', component: ProductListComponent},
      {path: 'products/:id', component:ProductDetailComponent},
      {path:'infos',component:InfosComponent}
      
    ]
    
 },
  
  {
    path: 'aphrodite',
    component: AppLayoutComponent,
    canActivate: [RoleGuardService],
    data: { roles: ["ROLE_USER", "ROLE_ADMIN"] },
    children: [
      { path: 'category/add', component: AjouterCategoryComponent, canActivate: [RoleGuardService], data: { roles: ["ROLE_ADMIN"] } },
      { path: '', component: ProductListComponent },
      { path: 'products/add', component: ProductFormComponent, canActivate: [RoleGuardService], data: { roles: ["ROLE_ADMIN"] } },
      { path: 'products', component: ProductListComponent},
      {path: 'products/:id', component:ProductDetailComponent}
    ]
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', redirectTo: '' },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }