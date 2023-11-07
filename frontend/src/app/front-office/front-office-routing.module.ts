// import { ShopdetailComponent } from './../views/front/shopdetail/shopdetail/shopdetail.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FrontOfficeComponent} from './front-office.component';
import {HomeComponent} from './home/home.component';

import {ShopComponent} from './shop/shop.component';
import {ShopdetailComponent} from './shopdetail/shopdetail.component';
import {CheckoutComponent} from './checkout/checkout.component';
import {ContactComponent} from './contact/contact.component';

import {AddpublicationComponent} from './publication/addpublication/addpublication.component';
import {AllPublicationComponent} from './publication/allpublication/all-publication.component';

import {AuthuserService} from '../services/authentificationService/authuser.service';
import {GuarduserGuard} from '../shared/guards/guarduser.guard';
import {LivraisonComponent} from './livraison/livraison.component';
import {FactureComponent} from './facture/facture.component';
import {CommandsComponent} from './commands/commands.component';
import { PaniersComponent } from './paniers/paniers.component';


const routes: Routes = [
    {
      path: '', component: FrontOfficeComponent, children: [
        {path: 'home', component: HomeComponent},
        {path: 'home/:id', component: HomeComponent},
        {path: 'shopdetail', component: ShopdetailComponent},
        
        {path: 'paniers', component: PaniersComponent},
        {
          path: 'livraison/:idLivraison', component: LivraisonComponent, canActivate: [GuarduserGuard], data: {role: 'client'}
        },{
          path: 'facture/:idFacture', component: FactureComponent, canActivate: [GuarduserGuard], data: {role: 'client'}
        },
        {path: 'shop', component: ShopComponent},
        {path: 'checkout', component: CheckoutComponent},
        {path: 'commands', component: CommandsComponent},
        {path: 'contact', component: ContactComponent},
        {path: 'shop', component: ShopComponent},
        {
          path: 'add-post', component: AddpublicationComponent,
          canActivate: [GuarduserGuard],
          data: {role: 'client'}
        },

        {
          path: 'all-posts',
          component: AllPublicationComponent,
          canActivate: [GuarduserGuard],
          data: {role: 'client'}
        },




      ]
    }
  ]
;

@NgModule({

  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule {
}
