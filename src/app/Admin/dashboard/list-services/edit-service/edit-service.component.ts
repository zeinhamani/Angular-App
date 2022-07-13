import { ServiceHabitat } from 'src/app/models/service-habitat.model.ts';
import { HabitatServicesService } from 'src/app/services/habitat-services.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  
  constructor(private formBuilder: FormBuilder, private servService: HabitatServicesService, private activeRoute: ActivatedRoute){}
  addForm!: FormGroup
  service!: ServiceHabitat
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
  get description() {
    return this.addForm.get('description')
  }
 
  
  creer(){
      this.servService.addServ(this.addForm.value).subscribe(
        (response) =>  response
      )
    } 
  initForm(){
    const servId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(servId) {
      this.servService.getServItem(+servId).subscribe(
        (response) => { 
             this.service = response
             this.addForm = this.formBuilder.group({
               nom: [response["nom"], [Validators.required,Validators.minLength(3)]],  
               description: [response["description"], [Validators.required]]  
        })} )
   }
  }
  editService(){
    this.servService.updatedServ(this.service.id,this.addForm.value).subscribe(
      () => console.log('done')
    )
  }
}
