import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categorie } from 'src/app/models/categorie.model.ts';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  categories!: Categorie[]
  constructor(private categorieService: CategoriesService) { }

  ngOnInit(): void {
    //this.categories = this.categorieService.categories
    this.getCategories()
  }

  getCategories(){
    this.categorieService.getCatList().subscribe(
      (response) => this.categories = response["hydra:member"]
    )
  }
}
