import { Destination } from './../../../../models/destination.model.ts';
import { DestinationsService } from './../../../../services/destinations.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-destination',
  templateUrl: './edit-destination.component.html',
  styleUrls: ['./edit-destination.component.css']
})
export class EditDestinationComponent implements OnInit {


  constructor(private formBuilder: FormBuilder, private destService: DestinationsService, private activeRoute: ActivatedRoute){}
  addForm!: FormGroup
  destination!: Destination
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
    const destId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(destId) {
      this.destService.getDestItem(+destId).subscribe(
        (response) => { 
             this.destination = response
             this.addForm = this.formBuilder.group({
               ville: [response["ville"], Validators.required],
               departement: [response["departement"], Validators.required],
               pays: [response["pays"], Validators.required]    
        })} )
   }
  }

  editDestination(){
    this.destService.updatedDest(this.destination.id,this.addForm.value).subscribe(
      () => console.log('Done')
    )
  }
}
