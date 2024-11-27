import { Category } from "./category";
import { Commentaire } from "./commentaire";

export class Product {
    constructor(
      public id: number,
      public name: string,
      public photoUrl: string,
      public prix: number,
      public marque: string,
      public disponible: boolean,
      public dateAjout: Date,
      public commentaireList: Commentaire[] = [],
      public description: string,
      public categorie?: Category,
    ) {}
  }
  