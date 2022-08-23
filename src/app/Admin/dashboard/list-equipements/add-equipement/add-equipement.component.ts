import { EquipementsService } from './../../../../services/equipements.service';
import { MediasService } from './../../../../services/medias.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { faImage} from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-equipement',
  templateUrl: './add-equipement.component.html',
  styleUrls: ['./add-equipement.component.css']
})
export class AddEquipementComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private equipService: EquipementsService,private mediaService: MediasService, private toastr: ToastrService,private router:Router){}
  addForm!: FormGroup
  imageIcon = faImage
  file!: any;
  
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

  creerEquipement(){
      this.equipService.addEquip(this.addForm.value).subscribe(
        (res) => {
          this.mediaService.addMedia(this.file,0,0,0,res.id).subscribe(
            response => console.log(response)
          )
          this.toastr.success('Equipement est  crée!', 'Bien enregistrer!')
          this.router.navigate(['Admin/equipements'])
        },

        (err) => this.toastr.error('essayer plus tard',' Enregistrement échouée')
      )
    } 

}
