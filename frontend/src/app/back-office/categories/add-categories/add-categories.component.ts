import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategorieService} from '../../../services/categorie.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-add-categories',
  templateUrl: './add-categories.component.html',
  styleUrls: ['./add-categories.component.css']
})
export class AddCategoriesComponent implements OnInit {
  formCategory: FormGroup
  id: number;

  constructor(private fb: FormBuilder,
              private router: Router,
              private active: ActivatedRoute,
              private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.formCategory = this.fb.group({
      nom: ['', [Validators.required]]
    })
    this.active.params.subscribe(res => {
      this.id = res.id;
      if (res.id) {
        this.categorieService.getCategory(res.id).subscribe(category => {
          console.log(category)
          this.formCategory.patchValue({
            nom: category.nom
          })
        })
      }
    })

  }

  addCategory() {
    this.categorieService.addCategorie(this.formCategory.value).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/list-categories')
    })
  }

  updateCategory() {
    this.categorieService.updateCategorie(this.formCategory.value, this.id).subscribe(res => {
      console.log(res)
      this.router.navigateByUrl('/admin/list-categories')
    })

  }
}
