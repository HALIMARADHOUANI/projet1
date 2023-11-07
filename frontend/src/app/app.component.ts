import {Component, OnInit} from '@angular/core';
import {CartsService} from './services/carts.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'marketTn';

  constructor(private cartsService: CartsService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem(environment.panel)) {
      this.cartsService.calculatePanelSize(JSON.parse(localStorage.getItem(environment.panel)).length);
    }
  }

}
