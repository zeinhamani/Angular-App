import { HabitatList } from './../../../models/habitatList.model';
import { Router } from '@angular/router';
import { HabitatsService } from './../../../services/habitats.service';
import { HabitatServicesService } from './../../../services/habitat-services.service';
import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.css']
})
export class HabitatsComponent implements OnInit {

  edit = faEdit
  delete = faTrash
  habitats!: HabitatList[] 
  habitatId: number = 11
 
  constructor(private habitatService: HabitatsService, private router: Router) { }

  ngOnInit(): void {
    //this.habitats = this.habitatService.habitats
    this.getHabitats()
  
  }
  getHabitats(){
    this.habitatService.getHabitatList().subscribe(
      (response) => this.habitats = response["hydra:member"]
    )
  }
  creer(){
  }
  modifier() {
    
  }
  supprimer(){
   
  }
}
