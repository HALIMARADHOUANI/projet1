import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Comments} from '../shared/models/comments';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  commentUrl: string = "http://localhost:3000/comment"
  httpOption = {
    Headers: new HttpHeaders({'content_type': 'application'})
  }

  constructor(private https: HttpClient) {
  }

  getComment(): Observable<Comments[]> {

    return this.https.get<Comments[]>(this.commentUrl)
  }

  getAllComment() {
    return this.https.get(this.commentUrl)
  }

  /* addComment(pub:Comment ): Observable<Comment> {
     return this.http.post<Comment>(this.commentUrl, pub,this.httpOptions);
   } */
  addComment(pub: any) {
    return this.https.post(`${environment.apiUrl}${environment.comments}`, pub)
  }

  deleteComment(idArchive: any): Observable<any> {
    return this.https.delete<Comments>(`${environment.apiUrl}${environment.comments}/${idArchive}`);
  }

  getCommentByidArchive(idArchive: number): Observable<Comments> {
    return this.https.get<Comments>(this.commentUrl + '/' + idArchive);
  }

  updateComment( Pub: Comments,idArchive: number): Observable<any> {
    return this.https.patch(`${environment.apiUrl}${environment.comments}/${idArchive}`, Pub);
  }


}
