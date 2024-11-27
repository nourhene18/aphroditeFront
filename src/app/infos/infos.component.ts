import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [CardModule,ButtonModule],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent {
  router:Router=inject(Router);
  siteInfo = {
    author: 'Nourhene ben Slema',
    creationDate: '27/11/12024',
    description: 'Notre site web cherche à offrir non seulement des produits cosmetiques de hautes gamme, mais aussi une fluide performance!',
    version: '1.0.0'
  };
  goBack(){
    this.router.navigate(['/products']);
  }
}
