import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthentificationRoutingModule } from './authentification-routing.module';
import { AuthentificationComponent } from './authentification.component';
import { ChangermotdepasseComponent } from './componentauth/changermotdepasse/changermotdepasse.component';
import { CodeconfirmationComponent } from './componentauth/codeconfirmation/codeconfirmation.component';
import { MotdepasseoublierComponent } from './componentauth/motdepasseoublier/motdepasseoublier.component';
import { LoginComponent } from './componentauth/login/login.component';
import { RegisterComponent } from './componentauth/registr/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthentificationComponent,
    ChangermotdepasseComponent,
    CodeconfirmationComponent,
    MotdepasseoublierComponent,
    LoginComponent,
    RegisterComponent

  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
