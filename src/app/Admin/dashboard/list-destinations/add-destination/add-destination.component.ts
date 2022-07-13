import { DestinationsService } from './../../../../services/destinations.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.css']
})
export class AddDestinationComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private destService: DestinationsService){}
  addForm!: FormGroup
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('ville')
  }
  get departement() {
    return this.addForm.get('departement')

  }
  get pays() {
    return this.addForm.get('pays')

  }

 
  initForm(){
    this.addForm =  this.formBuilder.group({
      ville: ['', Validators.required],
      departement: ['', Validators.required],
      pays: ['', Validators.required]
    })
  }
  
  creer(){
      this.destService.addDest(this.addForm.value).subscribe(
        (response) =>  console.log(response)
      )
    } 

}
