import {NgModule, Component} from '@angular/core';
import {ExtraOptions, PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './authentification/componentauth/login/login.component';
import {RegisterComponent} from './authentification/componentauth/registr/register.component';
import {GuardAdminGuard} from './shared/guards/guard-admin-guard.service';
import {
  MotdepasseoublierComponent
} from './authentification/componentauth/motdepasseoublier/motdepasseoublier.component';
import {GuarduserGuard} from './shared/guards/guarduser.guard';

const routerConfig: ExtraOptions = {
  preloadingStrategy: PreloadAllModules,
  scrollPositionRestoration: 'enabled'
};
const routes: Routes = [{
  path: '',
  loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule)
},
  {
    path: 'admin',
    canActivate: [GuardAdminGuard,GuarduserGuard],
    data: {role: 'admin'},
    loadChildren: () => import('./back-office/back-office.module').then(m => m.BackOfficeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./authentification/authentication.module').then(m => m.AuthenticationModule)
  },

  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: MotdepasseoublierComponent},
  {path: 'reset-password/:token', component: MotdepasseoublierComponent},
  // {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, routerConfig)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
