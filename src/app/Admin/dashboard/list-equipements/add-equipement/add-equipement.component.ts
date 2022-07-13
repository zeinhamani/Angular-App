import { EquipementsService } from './../../../../services/equipements.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css']
})
export class AddEquipementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private equipService: EquipementsService){}
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
  
  creerEquipement(){
      this.equipService.addEquip(this.addForm.value).subscribe(
        (response) =>  console.log(response)
      )
    } 

}
