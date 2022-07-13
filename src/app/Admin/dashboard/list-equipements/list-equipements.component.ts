import { EquipementsService } from './../../../services/equipements.service';
import { Equipement } from './../../../models/equipement.model.ts';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-list-equipements',
  templateUrl: './list-equipements.component.html',
  styleUrls: ['./list-equipements.component.css']
})
export class ListEquipementsComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  equipements!: Equipement[]
  constructor(private equipementS: EquipementsService) { }

  ngOnInit(): void {
    //this.equipements = this.equipementS.equipements
    this.getEquipements()
  }  
  getEquipements(){
    this.equipementS.getEquipList().subscribe(
      (response) => this.equipements = response["hydra:member"]
    )
  }
}
