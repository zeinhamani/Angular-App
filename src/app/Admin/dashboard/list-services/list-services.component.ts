import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
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
  constructor(private serviceHS: HabitatServicesService,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    //this.equipements = this.equipementS.equipements
    this.getServices()
  }  
  getServices(){
    this.serviceHS.getServList().subscribe(
      (response) => this.services = response["hydra:member"]
    )
  }
  addService(){
    this.router.navigate(['Admin/services/add'])
  }

  supprimer(id:number){
    this.serviceHS.deleteServ(id).subscribe(
      (res) => this.toastr.success('cette service est supprimer!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }

}
