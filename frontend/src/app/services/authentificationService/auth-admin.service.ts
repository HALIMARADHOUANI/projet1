import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {map, Observable, of} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  private _authenticated: boolean = false;
  decodedToken: any;


  helper = new JwtHelperService()
  role = ''

  constructor(private http: HttpClient,
              private router: Router) {

  }

  set accessToken(token: string) {
    localStorage.setItem(environment.token, token);
  }

  get accessToken(): string {
    return localStorage.getItem(environment.token) ?? '';
  }

  login(data: any) {

    return this.http.post(`${environment.apiUrl}${environment.users}/login`, data).pipe(map(res => {
      this._authenticated = true;

      return res
    }))
  }
  forgotPassword(data: any) {

    return this.http.post(`${environment.apiUrl}${environment.users}/forgot-password`, data).pipe(map(res => {
      return res
    }))
  }
  resetPassword(data: any) {

    return this.http.patch(`${environment.apiUrl}${environment.users}/reset-password`, data).pipe(map(res => {
      return res
    }))
  }

  saveToken(token: any) {
    localStorage.setItem(environment.token, token);
    this.decodedToken = helper.decodeToken(this.accessToken);
    console.log(this.decodedToken)
    this.http.get(`${environment.apiUrl}${environment.users}/${this.decodedToken.id}`)
      .subscribe(res => {
        this._authenticated = true;

        localStorage.setItem(environment.users, JSON.stringify(res));
      })


    return this.decodedToken;
  }

  saveDataProfil(token: any) {

    //  let decodeToken= this.helper.decodeToken(token)

    localStorage.setItem('token', token)

  }

  getUsername() {
    let token: any = localStorage.getItem('token')
    let decodeToken = this.helper.decodeToken(token)

    return decodeToken.username

  }


  LoggedIn() {
    let token: any = localStorage.getItem('token')
    if (!token) {
      return false
    }
    let decodeToken = this.helper.decodeToken(token)


    if (decodeToken.role !== 'Admin') {
      return false
    }

    if (this.helper.isTokenExpired(token)) {
      return false
    }

    return true
  }

  logout() {
    localStorage.clear();
    this._authenticated = false;
    this.router.navigateByUrl('/login')
  }

  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }


    // If the access token exists and it didn't expire, sign in using it
    return of(true);
  }

}
