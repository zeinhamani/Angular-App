import { Categorie } from 'src/app/models/categorie.model.ts';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, 
              private catService: CategoriesService,
              private router: Router,
              private activeRoute: ActivatedRoute){}
  addForm!: FormGroup
  categorie!: Categorie
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
 
  initForm(){
    const catId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(catId) {
      this.catService.getCatItem(+catId).subscribe(
        (response) => { 
             this.categorie = response
             this.addForm = this.formBuilder.group({
               nom: [response["nom"], [Validators.required,Validators.minLength(3)]],    
        })} )
   }
  }
    editCat(){
      this.catService.updatedCat(this.categorie.id,this.addForm.value).subscribe(
        () => console.log('Done')
      )
    } 
}
