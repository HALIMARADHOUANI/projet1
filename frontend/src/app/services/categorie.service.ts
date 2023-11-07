import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Categories} from '../shared/models/Categories';

@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  constructor(private https: HttpClient) {
  }

  getCategory(id): Observable<Categories> {

    return this.https.get<Categories>(`${environment.apiUrl}${environment.categories}/${id}`)
  }

  getAllCategories() {
    return this.https.get(`${environment.apiUrl}${environment.categories}`)
  }

  /* addCategorie(pub:Categorie ): Observable<Categorie> {
     return this.http.post<Categorie>(this.categorieUrl, pub,this.httpOptions);
   } */
  addCategorie(categorie: Categories) {
    return this.https.post(`${environment.apiUrl}${environment.categories}`, categorie)
  }

  deleteCategorie(idArchive: any): Observable<any> {
    return this.https.delete<Categories>(`${environment.apiUrl}${environment.categories}/${idArchive}`);
  }


  updateCategorie(Pub: Categories, idArchive: number): Observable<any> {
    return this.https.patch(`${environment.apiUrl}${environment.categories}/${idArchive}`, Pub);
  }
}
