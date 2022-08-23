import { Habitat } from 'src/app/models/habitat.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ProprietaireComponent } from './../proprietaire.component';
import { HabitatsService } from 'src/app/services/habitats.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mes-habitats',
  templateUrl: './mes-habitats.component.html',
  styleUrls: ['./mes-habitats.component.css']
})
export class MesHabitatsComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  serverUrl = environment.SERVER_URL
  habitats: Habitat[] = []
  totalLength!: number;
  p: number = 1;
  constructor(private habitatService: HabitatsService, 
    private router : Router,
    private toastr: ToastrService,
    private  proprietaire: ProprietaireComponent ) { }

  ngOnInit(): void {
    this.getUserHabitats()
  }
  
  getUserHabitats(){
    for(let habitat of this.proprietaire.currentUser.habitats){
      this.habitatService.getHabitatItem(habitat.id).subscribe(
             (response) => {
              this.habitats.push(response)
              this.totalLength = response["hydra:totalItems"]
            }
      )
    }
   
  }
  voirHabitat(habitatId: number) {
    this.router.navigate(['habitats', habitatId ])
  }
  addHabitat() {
    this.router.navigate(['proprietaire/add'])
  }
 
  supprimer(id:number){
    this.habitatService.deleteHabitat(id).subscribe(
      (res) => this.toastr.success('cette habitat est supprimer!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }
}
