import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Product} from '../shared/models/product';
import {environment} from '../../environments/environment';
import {map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public url = 'http://localhost:3000/produits';
  ////
  public list!: Product[];


  getListProduct() {
    return this.http.get<Product[]>(`${environment.apiUrl}${environment.products}`);
  }
  getListProductByCategories(categories) {
    return this.http.get<Product[]>(`${environment.apiUrl}${environment.products}/categories/${categories}`);
  }

  addProduct(product) {
    return this.http.post(`${this.url}/addProduct`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${environment.apiUrl}${environment.products}/delete-by-id/${id}`);
  }

  updateProduct(id: number, p) {
    return this.http.patch(`${environment.apiUrl}${environment.products}/update-product/${id}`, p)
      .pipe(map((res: any) => res.data));

  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.apiUrl}${environment.products}/${id}`)
      .pipe(map((res: any) => res.data));

  }
  search(value) {
    console.log(value)
    return this.http.get(`${environment.apiUrl}${environment.products}/search/${value}`).pipe(map(res=>res))

  }

}


