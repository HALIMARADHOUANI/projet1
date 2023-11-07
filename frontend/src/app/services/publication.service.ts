import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Publication} from '../shared/models/publication';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private http:HttpClient) { }


  getPublication(id):Observable<Publication[]>{

    return this.http.get<Publication[]>(`${environment.apiUrl}${environment.posts}/${id}`)
   }
  getAllPosts(){
   return this.http.get(`${environment.apiUrl}${environment.posts}`)
  }

   addPost(pub:any){
     return this.http.post(`${environment.apiUrl}${environment.posts}`, pub)
   }

   deletePublication(id: any): Observable<any> {
     return this.http.delete<Publication>(`${environment.apiUrl}${environment.posts}/${id}`);
   }

   getPublicationById(id: number): Observable<Publication> {
     return this.http.get<Publication>(`${environment.apiUrl}${environment.posts}/${id}`);
   }
   updatePublication(id: number, Pub: Publication): Observable<any> {
     return this.http.put("this.publicationsUrl/" + id, Pub);

    }


}
