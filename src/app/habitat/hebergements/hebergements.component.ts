import { CategoriesService } from './../../services/categories.service';
import { Categorie } from './../../models/categorie.model.ts';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hebergements',
  templateUrl: './hebergements.component.html',
  styleUrls: ['./hebergements.component.css']
})
export class HebergementsComponent implements OnInit {

  categories: Categorie[] =[]

  constructor(private categorieService: CategoriesService, private router: Router) { }

  ngOnInit(): void {
    
  }

  voir(){
    this.router.navigate(['/Client/list'])
  }
}
