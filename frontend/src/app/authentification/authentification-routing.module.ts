import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthentificationComponent } from './authentification.component';
import { LoginComponent } from './componentauth/login/login.component';
import { RegisterComponent } from './componentauth/registr/register.component';
import { MotdepasseoublierComponent } from './componentauth/motdepasseoublier/motdepasseoublier.component';
import { CodeconfirmationComponent } from './componentauth/codeconfirmation/codeconfirmation.component';
import { ChangermotdepasseComponent } from './componentauth/changermotdepasse/changermotdepasse.component';

const routes: Routes = [{ path: '', component: AuthentificationComponent,children:[
  {path:'login', component:LoginComponent},
  {path:'registr', component:RegisterComponent},
  {path:'modepasseoublier', component:MotdepasseoublierComponent},
  {path:'codeconfirmation', component:CodeconfirmationComponent},
  {path:'changermdp', component:ChangermotdepasseComponent},
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthentificationRoutingModule { }
