import {Component, OnInit} from '@angular/core';
import {CategorieService} from '../../../services/categorie.service';

@Component({
  selector: 'app-list-categories',
  templateUrl: './list-categories.component.html',
  styleUrls: ['./list-categories.component.css']
})
export class ListCategoriesComponent implements OnInit {
  categoriesList: any;

  constructor(private categorieService: CategorieService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.categorieService.getAllCategories().subscribe(res => {
      this.categoriesList = res
    })
  }

  delete(categorie: any,i) {
    this.categorieService.deleteCategorie(categorie.id).subscribe(res => {
      this.categoriesList.splice(categorie.id,1)
      return res
    })

  }
}
