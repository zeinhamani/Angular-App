import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private catService: CategoriesService){}
  addForm!: FormGroup
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
 
  initForm(){
    this.addForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],    
    })
  }
  
    creer(){
      this.catService.addCat(this.addForm.value).subscribe(
        (response) =>  console.log(response)
      )
    } 
    

}