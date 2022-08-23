import { MediasService } from './../../../../services/medias.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFileImage} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private catService: CategoriesService, private mediaService: MediasService){}
  addForm!: FormGroup
  file!: any;
  imageIcon = faFileImage
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
 
  initForm(){
    this.addForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      file: [this.file],     
    })
  }
  
  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }
    creer(){
      this.catService.addCat(this.addForm.value).subscribe(
        (response) =>  {
          this.mediaService.addMedia(this.file,response.id).subscribe(
            response => console.log(response)
          )
        }
      )
    } 
    

}