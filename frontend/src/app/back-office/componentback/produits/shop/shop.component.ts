import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  id:any
  data:any = {}
  loading:boolean = false
  constructor(private route:ActivatedRoute , private service:ProductService) {
    this.id = this.route.snapshot.paramMap.get("id")
    console.log(this.id)
   }
   ngOnInit(): void {
    this.getProduct()
  }
  getProduct() {
    this.loading = true
    this.service.getProductById(this.id).subscribe(res => {
      this.loading = false
      this.data = res
    } ,error => {
      this.loading = false
      alert(error)
    })
  }
}

