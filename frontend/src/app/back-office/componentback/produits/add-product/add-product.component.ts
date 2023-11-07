import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../../../services/product.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Product} from '../../../../shared/models/product';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import {forkJoin, of} from 'rxjs';
import {environment} from '../../../../../environments/environment';
import {CategorieService} from '../../../../services/categorie.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  public action!: string;
  public product!: Product;
  formProduct: FormGroup;
  fileName = '';
  fileUploaded: any;
  fileUploadError = false;
  uploadProgress: number;
  id: number;
   categoriesList: any;

  constructor(
    private productService: ProductService,
    private categorieService: CategorieService,
    private http: HttpClient,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.formProduct = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      reference: ['', [Validators.required, Validators.minLength(3)]],
      CategorieId: ['1', [Validators.required]],
      quantity: [0, [Validators.required]],
      price: ['', [Validators.required, Validators.minLength(3)]],
      image: [''],
    })
    this.currentRoute.params.subscribe(res => {
      console.log(res)
      if (res.id != null) {
        this.id = res.id;
        this.action = 'Modifier';
        this.productService.getProductById(res.id).subscribe(
          (data) => {
            this.formProduct.patchValue({
              nom: data.nom,
              reference: data.reference,
              CategorieId: data.CategorieId,
              quantity: data.quantity,
              price: data.price,
            })
            this.fileName = data.image
            this.product = data
            console.log(this.fileName)
          }
        )
      } else {
        this.action = 'Ajouter';
        this.product = new Product;
      }
    })
    forkJoin([
      this.categorieService.getAllCategories()
    ]).subscribe(res => {
      this.categoriesList = res[0]
    })

  }

  get form() {
    return this.formProduct.controls;
  }

  saveProduct() {
    console.log('ok', this.formProduct.value)
    let fd = new FormData();
    fd.append('nom', this.formProduct.value.nom);
    fd.append('reference', this.formProduct.value.reference)
    fd.append('quantity', this.formProduct.value.quantity)
    fd.append('price', this.formProduct.value.price)
    fd.append('CategorieId', this.formProduct.value.CategorieId)
    fd.append('photo', this.fileUploaded)
    if (this.action == 'Ajouter') {

      this.http.post(`${environment.apiUrl}${environment.products}/add-product`,
        fd, {
          reportProgress: true,
          observe: 'events'
        })
        .pipe(catchError(error => {
            this.fileUploadError = true;
            return of(error)
          }),
          finalize(() => {
            console.log('ok')
            this.uploadProgress = null;
            this.router.navigate(['/list-products'])

          }))
        .subscribe(event => {
          console.log(event.type == 0)
          if (event.type == 0) {
            this.uploadProgress = Math.round(100 * (event.loaded / event.total))
          }

        });

    } else {
      console.log('upd')
      this.productService.updateProduct(this.product.id, fd).subscribe(
        () => this.router.navigate(['/list-products'])
      );
    }
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileUploaded = file;
      this.fileName = file.name;
      this.formProduct.patchValue({
        image: this.fileName
      })
      this.fileUploadError = false;
      // this.http.post("/api/thumbnail-upload", formData, {
      //   reportProgress: true,
      //   observe: 'events'
      // })
      //   .pipe(catchError(error => {
      //       this.fileUploadError = true;
      //       return of(error)
      //     }),
      //     finalize(() => {
      //       this.uploadProgress = null;
      //     }))
      //   .subscribe(event => {
      //     if (event.type == HttpEventType.UploadProgress) {
      //       this.uploadProgress = Math.round(100 * (event.loaded / event.total))
      //     }
      //   });
    }
  }
}


