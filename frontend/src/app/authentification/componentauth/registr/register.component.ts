import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthuserService} from '../../../services/authentificationService/authuser.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-registr',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
//
  formRegister: FormGroup;

  constructor(private aus: AuthuserService,
              private fb: FormBuilder,
              private router: Router) {
  }

  messageError: any

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['client', [Validators.required]],
    })
  }

  register() {

    console.log(this.formRegister.value)
    this.aus.register(this.formRegister.value).subscribe(data => {
      this.router.navigateByUrl('/login')

      console.log(data)
    }, (err: HttpErrorResponse) => {
      console.log(err)
      this.messageError = "hjbgvehjbhvbsdhbv"
    })

  }

}
