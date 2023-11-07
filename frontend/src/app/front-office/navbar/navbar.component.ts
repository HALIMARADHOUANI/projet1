import {Component, OnDestroy, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {CartsService} from '../../services/carts.service';
import {AuthAdminService} from '../../services/authentificationService/auth-admin.service';
import {environment} from '../../../environments/environment';
import {CategorieService} from '../../services/categorie.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {
  panelNumber: number;
  private unsubscribe$: Subject<any> = new Subject<any>();
  user: any;
   categoriesList: any;

  constructor(private cartsService: CartsService,
              private catSer:CategorieService,
              private authService: AuthAdminService) {
  }

  ngOnInit(): void {
    this.user = localStorage.getItem(environment.token)
    this.cartsService.currentPanelSize.subscribe((res: any) => {
      this.panelNumber = res;
    })
    this.getAllCategories()
  }

  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

  logout() {
    console.log('ok')
    this.authService.logout();
  }
  getAllCategories(){
    this.catSer.getAllCategories().subscribe(res => {
      this.categoriesList = res
    })

  }
}
