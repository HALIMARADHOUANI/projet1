import {
  AddCommentComponent
} from './componentback/publications/add-comment/add-comment.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BackOfficeRoutingModule} from './back-office-routing.module';


import {FooterComponent} from './footer/footer.component';

import {ChatComponent} from './componentback/chat/chat.component';
import {NotfoundComponent} from './notfound/notfound.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NavComponent} from './nav/nav.component';
import {RouterModule} from '@angular/router';
import {BackOfficeComponent} from './back-office.component';

import {VenteComponent} from './componentback/vente/vente.component';
import {AddfactureComponent} from './componentback/factures/addfacture/addfacture.component';
import {ListfactureComponent} from './componentback/factures/listfacture/listfacture.component';
import {EditfactureComponent} from './componentback/factures/editfacture/editfacture.component';
import {PreviewfactureComponent} from './componentback/factures/previewfacture/previewfacture.component';


import {CommandesComponent} from './componentback/commandes/commandes.component';
import {MapsComponent} from './componentback/maps/maps.component';
import {AllProfilesComponent} from './componentback/allprofils/all-profiles.component';
import {AddpublicationComponent} from './componentback/publications/addpublication/addpublication.component';
import {ListpublicationComponent} from './componentback/publications/listpublication/listpublication.component';
import {UpdatecommentaireComponent} from './componentback/publications/updatecommentaire/updatecommentaire.component';
import {UpdatePublicationComponent} from './componentback/publications/update-publication/update-publication.component';
import {AddProductComponent} from './componentback/produits/add-product/add-product.component';
import {DeleteproduitComponent} from './componentback/produits/deleteproduit/deleteproduit.component';
import {EditproduitComponent} from './componentback/produits/editproduit/editproduit.component';
import {ListProductComponent} from './componentback/produits/listProducts/list-products.component';
import {ListCommentsComponent} from './componentback/publications/list-comments/list-comments.component';
import {OnlyOneErrorPipe} from '../shared/pipes/only-one-error.pipe';
import { AddCategoriesComponent } from './categories/add-categories/add-categories.component';
import { ListCategoriesComponent } from './categories/list-categories/list-categories.component';



@NgModule({
  declarations: [
    ListfactureComponent,
   
    FooterComponent,
    ChatComponent,
    NotfoundComponent,
    NavComponent,
    SidebarComponent,
    BackOfficeComponent,
    VenteComponent,
    AddfactureComponent,
    ListfactureComponent,
    EditfactureComponent,
    PreviewfactureComponent,
    CommandesComponent,
    MapsComponent,
    AllProfilesComponent,
    AddpublicationComponent,
    AddCommentComponent,
    ListpublicationComponent,
    UpdatecommentaireComponent,
    UpdatePublicationComponent,
    AddProductComponent,
    DeleteproduitComponent,
    EditproduitComponent,
    DeleteproduitComponent,
    ListProductComponent,
    UpdatePublicationComponent,
    ListCommentsComponent,
    OnlyOneErrorPipe,
    AddCategoriesComponent,
    ListCategoriesComponent

  ],
  exports: [
    OnlyOneErrorPipe
  ],
  imports: [
    CommonModule,
    BackOfficeRoutingModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,

  ]

})
export class BackOfficeModule {
}
