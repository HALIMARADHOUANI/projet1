import {Component, OnInit} from '@angular/core';
import {Product} from '../../shared/models/product';
import {BehaviorSubject, Observable} from 'rxjs';
import {ProductService} from '../../services/product.service';
import {environment} from '../../../environments/environment';
import {CartsService} from '../../services/carts.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  apiImg = environment.apiImg;
  public content = new BehaviorSubject<any>('panel');
  public share = this.content.asObservable();

  constructor(private productService: ProductService,
              private router: Router,
              private active: ActivatedRoute,
              private cartsService: CartsService) {
  }

  ngOnInit(): void {
    this.active.params.subscribe(res => {
      console.log(res)
      if (res.id) {
        this.products$ = this.productService.getListProductByCategories(res.id);

      } else {
        this.products$ = this.productService.getListProduct();

      }
    })
  }

  getAllProducts() {

  }

  add(product: Product) {
    if (!localStorage.getItem(environment.users)) {
      alert('Se connecter d\'abord')
      this.router.navigateByUrl('login')
    }
    if (localStorage.getItem(environment.panel) == null) {
      console.log("product", product);
      let panier: any = [];

      panier.push({
        item: product,
        quantity: 1
      });
      console.log("panel", panier);


      localStorage.setItem(environment.panel, JSON.stringify(panier));
      this.cartsService.calculatePanelSize(panier++);

    }
    // si panier existe deja
    else {
      let panier: any = JSON.parse(localStorage.getItem(environment.panel));

      let index: number = -1;
      for (var i = 0; i < panier.length; i++) {
        console.log(panier[i])
        let item: Product = panier[i].item;
        // si le produit se trouve deja dans le panier
        if (item.id == product.id) {
          index = i;
          break;
        }
      }
      // le produit ne se trouve pas dans le panier
      if (index == -1) {
        panier.push({
          item: product,
          quantity: 1

        });

        localStorage.setItem(environment.panel, JSON.stringify(panier));
        this.cartsService.calculatePanelSize(panier.length);
      }
      //le produit se trouve dans le panier
      else {
        let item: Product = JSON.parse(panier[index]);
        item.quantity = Number(item.quantity);
        panier[index] = item;

        localStorage.setItem(environment.panel, JSON.stringify(panier));
        this.cartsService.calculatePanelSize(panier.length);

      }
    }
  }
}
