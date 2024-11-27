import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorized',
  template: `
    <h1>Access Denied</h1>
    <p>You do not have permission to access this page.</p>
    <a routerLink="/login">Go to Home</a>
  `,
  standalone: true,
  imports : [RouterModule]
})
export class UnauthorizedComponent {}