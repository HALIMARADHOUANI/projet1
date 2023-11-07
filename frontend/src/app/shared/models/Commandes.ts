import {Livraison} from './livraison';
import {Facture} from './facture';

export interface Commandes {
  prixTotal: number;
  itempanier: any;
  user: number;
  id?:Number;
  dateCommande?:String;
  etatCmmande?:String;
  modePayement?:String;
  role?:String;
  Facture?:Facture;
  livraison?:Livraison;
}


