import { Router } from '@angular/router';
import { LocataireComponent } from './../locataire.component';
import { User } from '../../../models/user.model.ts';
import { ReservationsService } from '../../../services/reservations.service';
import { Reservation } from '../../../models/reservation.model.ts';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent implements OnInit {

  serverUrl = environment.SERVER_URL
  reservations: Reservation[] = []
  constructor(private reservationService: ReservationsService, 
              private router : Router,
              private locataire: LocataireComponent) { }

  ngOnInit(): void {
    //this.user = this.userService.users[1];
    //this.recupereReservations()
    this.getUserReservations()
  }

  getUserReservations(){
    for(let res of this.locataire.currentUser.reservations){
      this.reservationService.getReservItem(res.id).subscribe(
             (response) => {
              this.reservations.push(response)
            }
      )
    }
   
  }
  voirReservation(reservId: number) {
    this.router.navigate(['Locataire/reservations', reservId])
  }
  

  /** recuperer les reservations d'un client *
  recupereReservations(){
    for(let reservation of this.reservationService.reservations){
      if(reservation.user === this.user) {
        this.reservations.push(reservation)
      }
    }
  }*/

}
