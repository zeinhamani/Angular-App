import { Categorie } from 'src/app/models/categorie.model.ts';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { faImage} from '@fortawesome/free-solid-svg-icons';

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
  file!: any
  serverUrl = environment.SERVER_URL
  toggler = false;
  imageIcon = faImage
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
               nom: [this.categorie.nom, [Validators.required,Validators.minLength(3)]],    
        })} )
   }
  }
  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }
    editCat(){
      this.catService.updatedCat(this.categorie.id,this.addForm.value).subscribe(
        () => console.log('Done')
      )
    } 

    menuToggle() {
      this.toggler = !this.toggler; 
    }
}
