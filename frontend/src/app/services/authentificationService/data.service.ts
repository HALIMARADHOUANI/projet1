import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  token: any = localStorage.getItem('token')
  headerAdmin = new HttpHeaders()
    .set('authorization', this.token)
    .set('role', 'Admin')

  params = new HttpParams()
    .set('secret', environment.secret)
    .set('client', environment.client)


  headerall = new HttpHeaders()
    .set('authorization', this.token)

  constructor(private http: HttpClient) {
  }


  getAllProfils() {
    return this.http.get(`${environment.apiUrl}${environment.users}/profils`)
  }

  getAllUsers() {
    return this.http.get(`${environment.apiUrl}${environment.users}`)
  }

  addprofil(profile: any) {

    return this.http.post(environment.apiUrl + 'createprofil/', profile, {
      headers: this.headerAdmin,
      params: this.params
    })

  }

  deleteProfile(id: any) {
    return this.http.delete(`${environment.apiUrl}${environment.users}/${id}`)

  }


  updateProfile(newprofile: any,id: string) {

    return this.http.patch(`${environment.apiUrl}${environment.users}/${id}`, newprofile)

  }


  getOneProfile(id: any) {

    return this.http.get(environment.apiUrl + 'Profil/' + id, {headers: this.headerall, params: this.params})
  }

  desactivate(id: any) {
    console.log(id)
    return this.http.patch(`${environment.apiUrl}${environment.users}/desactivate`, {id: id})

  }
  activate(id: any) {
    console.log(id)
    return this.http.patch(`${environment.apiUrl}${environment.users}/activate`, {id: id})

  }

  search(value) {
    console.log(value)
    return this.http.get(`${environment.apiUrl}${environment.users}/search/${value}`).pipe(map(res=>res))

  }
}
