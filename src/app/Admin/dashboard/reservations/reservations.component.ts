import { ReservationList } from './../../../models/reservationList.model';
import { ReservationsService } from './../../../services/reservations.service';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {

  addIcon = faPlus
  reservations!: ReservationList[]
  constructor(private reservationService: ReservationsService) { }

  ngOnInit(): void {
   // this.reservations = this.reservationService.reservations
   this.getHabitats()
  }
  getHabitats(){
    this.reservationService.getReservList().subscribe(
      (response) => this.reservations = response["hydra:member"]
    )
  }
  
}
