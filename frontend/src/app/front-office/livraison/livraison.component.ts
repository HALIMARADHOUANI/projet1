import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LivraisonService} from '../../services/livraisons.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-livraison',
  templateUrl: './livraison.component.html',
  styleUrls: ['./livraison.component.css']
})
export class LivraisonComponent implements OnInit {
  listpanier: any;
  user: any;
  total: number = 0;
  formPanier: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private active:ActivatedRoute,
              private livraisonService: LivraisonService) {

  }

  ngOnInit(): void {

    console.log(localStorage.getItem(environment.panel))
    this.listpanier = JSON.parse(localStorage.getItem(environment.panel))
    this.getCartTotal()
    this.formPanier = this.fb.group({
      nom: [''],
      prenom: [''],
      email: [''],
      address: [''],
      phoneNumber: [''],
      state: [''],
      country: [''],
      city: [''],
      zipcode: [''],
      modePayment: [''],
      userId: [''],
      CommandeId: [''],
    })
    console.log(this.active.snapshot.params.idLivraison)
    this.user = JSON.parse(localStorage.getItem(environment.users))
    this.formPanier.patchValue({
      nom: this.user.nom,
      prenom: this.user.prenom,
      email: this.user.email,
      userId: this.user.id,
      CommandeId: this.active.snapshot.params.idLivraison,
    })
    console.log(this.formPanier.value)
  }

  getCartTotal() {
    this.total = 0
    console.log(this.listpanier)
    for (let x in this.listpanier) {
      this.total += this.listpanier[x].item.price * this.listpanier[x].quantity;
    }
    console.log(this.total)
  }

  addLivraison() {
    this.formPanier.patchValue({
      address: this.formPanier.value.address + ' ' +
        this.formPanier.value.phoneNumber + ' ' +
        this.formPanier.value.state + ' ' +
        this.formPanier.value.country + ' ' +
        this.formPanier.value.city + ' ' +
        this.formPanier.value.zipcode
    })
    this.livraisonService.addLivraison(this.formPanier.value).subscribe((res: any) => {
      console.log(res);
      this.router.navigateByUrl('facture/' + res.commande.id);
    })
  }
}
