import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {  faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import {  faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { Reservation } from 'src/app/models/reservation.model.ts';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reservation-item',
  templateUrl: './reservation-item.component.html',
  styleUrls: ['./reservation-item.component.css']
})
export class ReservationItemComponent implements OnInit {

  serverUrl = environment.SERVER_URL
  arrivee = faLevelDownAlt
  depart =  faLevelUpAlt
  reservation!: Reservation
  reservId!: string | null
  constructor(private reservationService: ReservationsService, private activeRoute: ActivatedRoute,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.reservId = this.activeRoute.snapshot.paramMap.get('id')
    if(this.reservId) {
      this.reservationService.getReservItem(+this.reservId).subscribe(
           (response) => this.reservation = response 
      )
    }
  }


  anullerReserv(){
    const reservationDate = new Date(this.reservation.DateReservation)
    const nowDate = new Date()
    const days = (nowDate.getTime() - reservationDate.getTime() ) / 1000 / 60 / 60 / 24 
    const body = {
           DateReserv: this.reservation.DateReservation,
           reservDate: reservationDate,
           dateNow: nowDate,
           days: days
    }
    console.log(body)
    if(days < 20) {
      if(this.reservId) {
        this.reservationService.updatedReserv(+this.reservId,{"Annulee":true}).subscribe(
          (res) => {
            this.toastr.success('', 'La réservation est annulée')
          },
          (err)=> {
            this.toastr.error('essayer une autre fois',"Un probleme survenue")
          }
        )
      }
    } else {
      this.toastr.warning('vous pouvez pas annuler cette reservation',"Date Depasser")
    }
   
  }
}
