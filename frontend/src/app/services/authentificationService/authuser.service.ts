import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {map, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthuserService {
  helper = new JwtHelperService()

  constructor(private http: HttpClient) {
  }


  register(body: any) {
    return this.http.post(`${environment.apiUrl}${environment.users}/register`, body)
  }

  login(body: any): any {
    console.log(body)
    return this.http.post('http://localhost:3000/api/v1/users/login', body).pipe(map(res => res))
  }


  saveToken(token: any) {

    localStorage.setItem('token', token)

  }


  userLoggedIn() {


    if (!localStorage.getItem('token')) {
      return false
    }
    let token: any = localStorage.getItem('token')
    let decodeToken = this.helper.decodeToken(token)


    if (decodeToken.role) {
      return false
    }

    if (this.helper.isTokenExpired(token)) {
      return false
    }

    return true


  }
}
