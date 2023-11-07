import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Commandes} from '../shared/models/Commandes';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommandeService {
  constructor(private https: HttpClient) {
  }

  getCommande(id): Observable<Commandes> {

    return this.https.get<Commandes>(`${environment.apiUrl}${environment.commands}/${id}`)
  }

  getMyCommands(): Observable<Commandes> {
    let headers = localStorage.getItem(environment.token);

    return this.https.get<Commandes>(`${environment.apiUrl}${environment.commands}/my-commands`, {
      headers:new HttpHeaders({'Authorization':`Bearer ${headers}`})
    })
  }

  getAllCommandes() {
    return this.https.get(`${environment.apiUrl}${environment.commands}`)
  }

  /* addCommande(pub:Commande ): Observable<Commande> {
     return this.http.post<Commande>(this.commandeUrl, pub,this.httpOptions);
   } */
  addCommande(commande: Commandes) {
    console.log(commande)
    return this.https.post(`${environment.apiUrl}${environment.commands}`, commande)
  }

  deleteCommande(idArchive: any): Observable<any> {
    return this.https.delete<Commandes>(`${environment.apiUrl}${environment.commands}/${idArchive}`);
  }


  updateCommande(idArchive: number, Pub: Commandes): Observable<any> {
    return this.https.put("this.commandeUrl/" + idArchive, Pub);
  }

  accepterCommande(id) {
    return this.https.patch(`${environment.apiUrl}${environment.commands}/accept`, {id: id});

  }

  refuserCommande(id) {
    return this.https.patch(`${environment.apiUrl}${environment.commands}/refuse`, {id: id});

  }
}
