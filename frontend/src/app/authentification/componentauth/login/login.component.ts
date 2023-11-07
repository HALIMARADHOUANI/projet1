import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthAdminService} from '../../../services/authentificationService/auth-admin.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin = this.fb.group({
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
    password: ['',
      [
        Validators.required,
      ]
    ]
  });
  dataToken: any;
  messageError: any;

  constructor(private aus: AuthAdminService, private route: Router,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  login() {
    this.aus.login(this.formLogin.value).subscribe((data: any) => {
      console.log(data)
      if(data.token==="Votre compte est bloqué")
      Swal.fire({
        title: 'Error!',
        text: data.token,
        icon: 'error',
        confirmButtonText: 'Cool'
      })
      this.dataToken = data
      let user = this.aus.saveToken(this.dataToken.token)
      console.log(user)
      if (user.role === "client") {

        this.route.navigateByUrl('/home')
      } else {

        this.route.navigateByUrl('/admin')
      }
    }, (err: HttpErrorResponse) => {
      console.log(err);
      this.messageError = err.error.error
    })
  }

}
