import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthAdminService} from '../../../services/authentificationService/auth-admin.service';
import {ActivatedRoute, Router} from '@angular/router';
import Swal from 'sweetalert2';
import {HttpErrorResponse} from '@angular/common/http';
import {confirmPasswordValidator} from '../../../shared/validators/password-confirm.validator';

@Component({
  selector: 'app-motdepasseoublier',
  templateUrl: './motdepasseoublier.component.html',
  styleUrls: ['./motdepasseoublier.component.css']
})
export class MotdepasseoublierComponent implements OnInit {
  hasToken: boolean;
  formForgot = this.fb.group({
    email: ['',
      [
        Validators.required,
        Validators.email
      ]
    ],
  })
  formReset = this.fb.group({
      code: ['',
        [
          Validators.required,
        ]
      ],
      password: ['',
        [
          Validators.required,
        ]
      ],
      confirmPassword: ['',
        [
          Validators.required,
        ]
      ]
    }, {
      validators: confirmPasswordValidator()
    }
  );
  dataToken: any;
  messageError: any;

  constructor(private aus: AuthAdminService, private route: Router,
              private active: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.formForgot.value)
    this.active.params.subscribe(data => {
      if (data["token"]) {
        this.hasToken = true;
        this.formReset.patchValue({

          code: data["token"]
        })
      }
    })
  }

  sendEmail() {
    this.aus.forgotPassword(this.formForgot.value).subscribe(console.log), (err: HttpErrorResponse) => {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: err?.error?.message,
        icon: 'error',
        confirmButtonText: 'Cool'
      })

      this.messageError = err.error.error
    }
  }

  reset() {
    this.aus.resetPassword(this.formReset.value).subscribe(() => {
      Swal.fire({
        title: 'Success!',
        text: 'Vous pouvez connecter maintenant',
        icon: 'info',
        confirmButtonText: 'Cool'
      })

      this.route.navigateByUrl('login');
    })
  }
}
