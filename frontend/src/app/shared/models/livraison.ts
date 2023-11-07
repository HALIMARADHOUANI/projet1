import {Commandes} from './Commandes';

export interface Livraison {
    idlivraison?:Number;
    fraisLivraison?:String;
    destination?:String;
    Commande?:Commandes;
}
