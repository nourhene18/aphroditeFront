import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {

  constructor(private auth:AuthService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): boolean{
    const expectedRole = route.data['roles'] as string[] ; 
    console.log(this.auth.isLoggedIn());
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    const userRoles = this.auth.getRoles() ;
    if (expectedRole && !expectedRole.some(role => userRoles.includes(role))) {
      this.router.navigate(['/unauthorized']); 
      return false;
    }
    return  true ; 
  }
}
