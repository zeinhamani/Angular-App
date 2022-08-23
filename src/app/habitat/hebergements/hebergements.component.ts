import { CategoriesService } from './../../services/categories.service';
import { Categorie } from './../../models/categorie.model.ts';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.css']
})
export class HebergementsComponent implements OnInit {

  categories: Categorie[] =[]
  serverUrl = environment.SERVER_URL

  constructor(private categorieService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    this.getCategories()
  }
  getCategories(){
    this.categorieService.getCatList().subscribe(
      (res) => this.categories = res["hydra:member"]
    )
  }
  
}
