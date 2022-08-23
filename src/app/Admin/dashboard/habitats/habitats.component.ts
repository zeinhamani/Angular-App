import { HabitatList } from './../../../models/habitatList.model';
import { Router } from '@angular/router';
import { HabitatsService } from './../../../services/habitats.service';
import { HabitatServicesService } from './../../../services/habitat-services.service';
import { Component, OnInit } from '@angular/core';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-habitats',
  templateUrl: './habitats.component.html',
  styleUrls: ['./habitats.component.css']
})
export class HabitatsComponent implements OnInit {

 
  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  habitats!: HabitatList[] 
  habitatId: number = 11
  serverUrl = environment.SERVER_URL
  totalLength!: number;
  p: number = 1;
 
  constructor(private habitatService: HabitatsService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    //this.habitats = this.habitatService.habitats
    this.getHabitats()
  
  }
  getHabitats(){
    this.habitatService.getHabitatList().subscribe(
      (response) => {
        this.habitats = response["hydra:member"]
        this.totalLength = response["hydra:totalItems"]
      }
    )
  }
  addHabitat(){
    this.router.navigate(['Admin/habitats/add'])
  }
  supprimer(id:number){
    this.habitatService.deleteHabitat(id).subscribe(
      (res) => this.toastr.success('cette habitat est supprimer!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }
}
