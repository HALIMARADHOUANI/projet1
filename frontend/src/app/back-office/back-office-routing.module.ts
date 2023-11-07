import {AddProductComponent} from './componentback/produits/add-product/add-product.component';

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BackOfficeComponent} from './back-office.component';
import {ChatComponent} from './componentback/chat/chat.component';
import {AddfactureComponent} from './componentback/factures/addfacture/addfacture.component';
import {EditfactureComponent} from './componentback/factures/editfacture/editfacture.component';
import {ListfactureComponent} from './componentback/factures/listfacture/listfacture.component';
import {PreviewfactureComponent} from './componentback/factures/previewfacture/previewfacture.component';
import {VenteComponent} from './componentback/vente/vente.component';


import {CommandesComponent} from './componentback/commandes/commandes.component';
import {MapsComponent} from './componentback/maps/maps.component';
import {AllProfilesComponent} from './componentback/allprofils/all-profiles.component';
import {DeleteproduitComponent} from './componentback/produits/deleteproduit/deleteproduit.component';
import {EditproduitComponent} from './componentback/produits/editproduit/editproduit.component';
import {
  AddCommentComponent
} from './componentback/publications/add-comment/add-comment.component';
import {AddpublicationComponent} from './componentback/publications/addpublication/addpublication.component';
import {UpdatecommentaireComponent} from './componentback/publications/updatecommentaire/updatecommentaire.component';
import {UpdatePublicationComponent} from './componentback/publications/update-publication/update-publication.component';
import {ListProductComponent} from './componentback/produits/listProducts/list-products.component';
import {ListCommentsComponent} from './componentback/publications/list-comments/list-comments.component';
import {ListpublicationComponent} from './componentback/publications/listpublication/listpublication.component';
import {AddCategoriesComponent} from './categories/add-categories/add-categories.component';
import {ListCategoriesComponent} from './categories/list-categories/list-categories.component';


const routes: Routes = [
  {
    path: '', component: BackOfficeComponent, children: [
      {path: 'vente', component: VenteComponent},
      {path: 'commande', component: CommandesComponent},
      {path: 'chat', component: ChatComponent},
      {path: 'addfacture', component: AddfactureComponent},
      {path: 'editfacture', component: EditfactureComponent},
      {path: 'previewfacture', component: PreviewfactureComponent},
      {path: 'listfacture', component: ListfactureComponent},
      // product
      {path: 'add-product', component: AddProductComponent},
      {path: 'delete-product', component: DeleteproduitComponent},
      {path: 'edit-product/:id', component: AddProductComponent},
      {path: 'list-products', component: ListProductComponent},
      // post
      {path: 'vente', component: VenteComponent},
      {path: 'add-post', component: AddpublicationComponent},
      {path: 'add-comment', component: AddCommentComponent},
      {path: 'list-posts', component: ListpublicationComponent},
      {path: 'list-comments', component: ListCommentsComponent},
      {path: 'updatecommentaire', component: UpdatecommentaireComponent},
      {path: 'update-publication', component: UpdatePublicationComponent},

      {path: 'maps', component: MapsComponent},
      //users
      {path: 'allprofils', component: AllProfilesComponent},
      {path: 'list-categories', component: ListCategoriesComponent},
      {path: 'add-categorie', component: AddCategoriesComponent},
      {path: 'edit-categorie/:id', component: AddCategoriesComponent},
    //command
      {path: 'list-commands', component: CommandesComponent},
    //facture
      {path: 'list-factures', component: ListfactureComponent},
    //  panier
    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BackOfficeRoutingModule {
}
