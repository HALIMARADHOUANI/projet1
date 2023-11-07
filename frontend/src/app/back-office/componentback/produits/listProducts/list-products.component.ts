import {Component, OnInit} from '@angular/core';
import {Product} from 'app/shared/models/product';
import {ProductService} from '../../../../services/product.service';
import {environment} from '../../../../../environments/environment';
import {FormBuilder} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductComponent implements OnInit {
  apiImg = environment.apiImg + 'Produit/';
  public title!: string;
  public list!: Product[];
  formSearch = this.fb.group({
    queue: ['']
  })

  constructor(private productService: ProductService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.title = "markettn";
    this.getAllProducts()
  }

  getAllProducts() {
    this.productService.getListProduct().subscribe(
      (data: Product[]) => this.list = data
    );

  }

  delete(product: Product) {
    this.productService.deleteProduct(product.id).subscribe(
      (res) => {
        console.log(res)
        let i = this.list.indexOf(product)
        this.list.splice(i, 1);

      }
    );
  }

  search() {
    if (this.formSearch.value.queue) {

      this.productService.search(this.formSearch.value.queue).subscribe((response: any) => {
        console.log(response)
        this.list = response.data;
        return response
      }, (err: HttpErrorResponse) => {
        console.log(err.message)

      })
    } else {
      this.getAllProducts()
    }

  }

}
