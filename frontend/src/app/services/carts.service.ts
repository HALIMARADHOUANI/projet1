import {HttpClient} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartsService {
  private panelSize = new BehaviorSubject(0);
  currentPanelSize = this.panelSize.asObservable();

  constructor(private http: HttpClient) {
  }

  createNewCart(model: any) {
    return this.http.post(environment.apiUrl + 'commands', model)
  }

  calculatePanelSize(size) {
    this.panelSize.next(size)
  }
}
