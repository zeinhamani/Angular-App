import { ReservationList } from './../../../models/reservationList.model';
import { ReservationsService } from './../../../services/reservations.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  reservations!: ReservationList[]
  totalLength!: number;
  p: number = 1;
  constructor(private reservationService: ReservationsService,private toastr: ToastrService) { }

  ngOnInit(): void {
   // this.reservations = this.reservationService.reservations
   this.getHabitats()
  }
  getHabitats(){
    this.reservationService.getReservList().subscribe(
      (response) => {
        this.reservations = response["hydra:member"]
        this.totalLength = response["hydra:totalItems"]
         }
    )
  }

  addReservation(){}
  supprimer(id:number){
    this.reservationService.deleteReserv(id).subscribe(
      (res) => this.toastr.success('cette reservation est supprimée!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }
  
}
