import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {FrontOfficeModule} from './front-office/front-office.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BackOfficeModule} from './back-office/back-office.module';
import {HttpClientModule} from '@angular/common/http';
import {AddpublicationComponent} from './front-office/publication/addpublication/addpublication.component';
import { OnlyOneErrorPipe } from './shared/pipes/only-one-error.pipe';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    AddpublicationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BackOfficeModule,
    FrontOfficeModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,

  ],

  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
