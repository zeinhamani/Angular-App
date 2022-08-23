import { Router } from '@angular/router';
import { CategoriesService } from './../../../services/categories.service';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categorie } from 'src/app/models/categorie.model.ts';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  
  serverUrl = environment.SERVER_URL
  addIcon = faPlus
  edit = faEdit
  delete = faTrash
categories!: Categorie[]
  totalLength!: number;
  p: number = 1;
  constructor(private categorieService: CategoriesService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.categories = this.categorieService.categories
    this.getCategories()
  }
   
  getCategories(){
  this.categorieService.getCatList().subscribe(
      (response) => {this.categories = response["hydra:member"]
      this.totalLength = response["hydra:totalItems"]}
    )
  }  
  addCat(){
    this.router.navigate(['Admin/categories/add']) 
  }
  supprimer(id:number){
    this.categorieService.deleteCat(id).subscribe(
      (res) => this.toastr.success('ce categorie est supprimer!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }
}
