import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';

import { RouterModule } from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { ShopdetailComponent } from './shopdetail/shopdetail.component';

import { CheckoutComponent } from './checkout/checkout.component';
import { FooterComponent } from './footer/footer.component';
import { ShopComponent } from './shop/shop.component';
import { FrontOfficeComponent } from './front-office.component';
import {AllPublicationComponent} from './publication/allpublication/all-publication.component';

import {ProductComponent} from './product/product.component';
import {LivraisonComponent} from './livraison/livraison.component';
import {FactureComponent} from './facture/facture.component';
import { CommandsComponent } from './commands/commands.component';
import { PaniersComponent } from './paniers/paniers.component';



@NgModule({
  declarations: [
    NavbarComponent,
    HomeComponent,
    ContactComponent,
    ShopComponent,
    ShopdetailComponent,

    CheckoutComponent,
    LivraisonComponent,
    FooterComponent,
    FrontOfficeComponent,
    ContactComponent,
    AllPublicationComponent,
    PaniersComponent,
    ProductComponent,
    FactureComponent,
    CommandsComponent,
],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class FrontOfficeModule { }
