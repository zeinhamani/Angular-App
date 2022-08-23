import { Equipement } from './../../../../models/equipement.model.ts';
import { Component, OnInit } from '@angular/core';
import { EquipementsService } from './../../../../services/equipements.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { faImage} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-equipement',
  templateUrl: './edit-equipement.component.html',
  styleUrls: ['./edit-equipement.component.css']
})
export class EditEquipementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private equipService: EquipementsService, private activeRoute: ActivatedRoute){}
  addForm!: FormGroup
  equipement!: Equipement
  file!: any;
  serverUrl = environment.SERVER_URL
  imageIcon = faImage
  toggler = false;
  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.addForm.get('nom')
  }
 
  initForm(){
    const equiId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(equiId) {
      this.equipService.getEquipItem(+equiId).subscribe(
        (response) => { 
             this.equipement = response
             this.addForm = this.formBuilder.group({
               nom: [this.equipement.nom, [Validators.required,Validators.minLength(3)]],    
        })} )
   }
  }
  
  handleMediaInput($event: any){
    this.file = $event.target.files[0];
    console.log('file', this.file)
  }

  editEquipement(){
      this.equipService.updatedEquip(this.equipement.id,this.addForm.value).subscribe(
        () =>  console.log('done')
      )
    } 
  
    menuToggle() {
      this.toggler = !this.toggler; 
    }

}
