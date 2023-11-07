import {Component, OnInit} from '@angular/core';
import {CartsService} from '../../services/carts.service';
import {environment} from '../../../environments/environment';
import {CommandeService} from '../../services/commande.service';
import {Commandes} from '../../shared/models/Commandes';
import {Product} from '../../shared/models/product';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-paniers',
  templateUrl: './paniers.component.html',
  styleUrls: ['./paniers.component.css']
})
export class PaniersComponent implements OnInit {
  apiImg = environment.apiImg + 'Produit/';
  cartProducts: any[] = [];
  total: number = 0;
  success: boolean = false
  private user: any;
  private unsubscribe$: Subject<any> = new Subject<any>();

  constructor(private service: CommandeService,
              private router: Router,
              private fb: FormBuilder) {
  }


  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem(environment.users))
    this.getCartProducts()

  }

  getCartProducts() {
    if (environment.panel in localStorage) {
      this.cartProducts = JSON.parse(localStorage.getItem(environment.panel)!)
    }
    this.getCartTotal()

  }

  addAmount(index: number) {
    this.cartProducts[index].quantity++
    localStorage.setItem(environment.panel, JSON.stringify(this.cartProducts))
    this.getCartTotal()
  }

  minsAmount(index: number) {
    this.cartProducts[index].quantity--
    this.getCartTotal()
    localStorage.setItem(environment.panel, JSON.stringify(this.cartProducts))
  }

  detectChange() {
    this.getCartTotal()
    localStorage.setItem(environment.panel, JSON.stringify(this.cartProducts))
  }

  deleteProduct(index: number) {
    this.cartProducts.splice(index, 1)
    this.getCartTotal()
    localStorage.setItem(environment.panel, JSON.stringify(this.cartProducts))
  }

  clearCart() {
    this.cartProducts = []
    this.getCartTotal()
    localStorage.setItem(environment.panel, JSON.stringify(this.cartProducts))
  }

  getCartTotal() {
    this.total = 0
    for (let x in this.cartProducts) {
      this.total += this.cartProducts[x].item.price * this.cartProducts[x].quantity;
    }
      this.cartProducts['total'] = this.total;
      localStorage.setItem(environment.panel ,JSON.stringify(this.cartProducts))

  }

  addCart() {
    let products = this.cartProducts.map(item => {
      return {productId: item.item.id, quantity: item.quantity}
    })
    console.log(this.user.id)
    let Model: Commandes = {
      prixTotal: this.total,
      itempanier: products,
      user: this.user.id
    }

    this.service.addCommande(Model).subscribe((res:any) => {
      this.success = true
      // localStorage.removeItem(environment.panel)
      this.router.navigateByUrl('livraison/'+res.status.id);
    })

    console.log(Model)
  }

  ngOnDestroy() {
    this.unsubscribe$.next(0);
    this.unsubscribe$.complete();
  }

}
