import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
 const url="http://localhost:8081";
 const TOKEN_KEY = "accessToken";
 const USER_KEY = "username";
 const ROLES_KEY = "roles"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private http:HttpClient) { }
  login(authentication:{username:string,password:string}):Observable<any>{
    return this.http.post<any>(url+"/auth/signin",authentication);
  }
  getToken():string | null{
  
    return localStorage.getItem(TOKEN_KEY);
  }
  saveToken(token:string){
    localStorage.setItem(TOKEN_KEY,token);
  }
  saveUser(user:any){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  getUser(): any {
    const user = localStorage.getItem(USER_KEY)
    return user ? JSON.parse(user):null ;
  }

  getRoles (): string[] {
   const user = this.getUser() ; 
   return user?.roles || [] ; 

  }
  isLoggedIn(): boolean {
    return !!this.getToken(); 
  }
}
