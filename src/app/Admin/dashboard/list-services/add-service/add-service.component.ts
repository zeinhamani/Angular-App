import { HabitatServicesService } from 'src/app/services/habitat-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private servService: HabitatServicesService){}
  addForm!: FormGroup
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
  get description() {
    return this.addForm.get('description')
  }
 
  initForm(){
    this.addForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      description: ['', [Validators.required]] 
    })
  }
  
  creerService(){
      this.servService.addServ(this.addForm.value).subscribe(
        (response) =>  console.log(response)
      )
    } 

}
