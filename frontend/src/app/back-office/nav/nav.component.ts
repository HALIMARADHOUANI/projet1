import {Component, OnInit} from '@angular/core';
import {AuthAdminService} from '../../services/authentificationService/auth-admin.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authAdminService: AuthAdminService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authAdminService.logout();
    this.router.navigateByUrl('login');
  }
}
