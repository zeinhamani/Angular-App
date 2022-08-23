import { EquipementsService } from './../../../services/equipements.service';
import { Equipement } from './../../../models/equipement.model.ts';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
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
  serverUrl = environment.SERVER_URL
  constructor(private equipementS: EquipementsService,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    //this.equipements = this.equipementS.equipements
    this.getEquipements()
  }  
  getEquipements(){
    this.equipementS.getEquipList().subscribe(
      (response) => this.equipements = response["hydra:member"]
    )
  }
  addEquip() {
    this.router.navigate(['Admin/equipements/add'])
  }

  supprimer(id:number){
    this.equipementS.deleteEquip(id).subscribe(
      (res) => this.toastr.success('ce equipement est supprimer!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }
}
