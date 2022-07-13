import { ReservationsService } from '../../../services/reservations.service';
import { Reservation } from '../../../models/reservation.model.ts';
import { Component, OnInit } from '@angular/core';
import {  faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import {  faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-ma-reservation',
  templateUrl: './ma-reservation.component.html',
  styleUrls: ['./ma-reservation.component.css']
})
export class MaReservationComponent implements OnInit {

  arrivee = faLevelDownAlt
  depart =  faLevelUpAlt
  reservation!: Reservation
  constructor(private reservationService: ReservationsService, private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //this.reservation = this.reservationService.reservations[1]
    const reservId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(reservId) {
      this.reservationService.getReservItem(+reservId).subscribe(
           (response) => this.reservation = response 
      )
    }
  }
  voirHabitat(id: number){
    this.router.navigate(['/habitats', id])
  }
  commenter(){
    this.router.navigate(['/Locataire/maReservation/commenter'])
  }
}
