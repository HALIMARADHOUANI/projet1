import {Commandes} from './Commandes';

export  interface  Facture{
    id?: Number;
    nom?:String;
    prenom?:String;
    adresse?:String;
    telephone?:Number;
    commande?:Commandes;
}
