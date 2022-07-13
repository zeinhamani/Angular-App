import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ServiceHabitat } from 'src/app/models/service-habitat.model.ts';
import { HabitatServicesService } from 'src/app/services/habitat-services.service';
@Component({
  selector: 'app-list-services',
  templateUrl: './list-services.component.html',
  styleUrls: ['./list-services.component.css']
})
export class ListServicesComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  services!: ServiceHabitat[]
  constructor(private serviceHS: HabitatServicesService) { }

  ngOnInit(): void {
    //this.equipements = this.equipementS.equipements
    this.getServices()
  }  
  getServices(){
    this.serviceHS.getServList().subscribe(
      (response) => this.services = response["hydra:member"]
    )
  }

}
