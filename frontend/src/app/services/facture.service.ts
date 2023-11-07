import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commandes} from '../shared/models/Commandes';
import {environment} from '../../environments/environment';
import {Facture} from '../shared/models/facture';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  constructor(private https: HttpClient) {
  }

  getFacture(id): Observable<Facture> {

    return this.https.get<Facture>(`${environment.apiUrl}${environment.factures}/${id}`)
  }

  getAllCommandes() {
    return this.https.get(`${environment.apiUrl}${environment.commands}`)
  }

  /* addCommande(pub:Commande ): Observable<Commande> {
     return this.http.post<Commande>(this.commandeUrl, pub,this.httpOptions);
   } */
  addCommande(commande: Commandes) {
    console.log(commande)
    return this.https.post(`${environment.apiUrl}${environment.commands}`,commande)
  }

  deleteCommande(idArchive: any): Observable<any> {
    return this.https.delete<Commandes>(`${environment.apiUrl}${environment.commands}/${idArchive}`);
  }



  updateCommande(idArchive: number, Pub: Commandes): Observable<any> {
    return this.https.put("this.commandeUrl/" + idArchive, Pub);
  }

  accepterCommande(id) {
    return this.https.patch(`${environment.apiUrl}${environment.commands}/accept`, {id:id});

  }
  refuserCommande(id) {
    return this.https.patch(`${environment.apiUrl}${environment.commands}/refuse`,{id:id});

  }
}
