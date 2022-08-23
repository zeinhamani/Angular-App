import { MesHabitatsComponent } from './../mes-habitats/mes-habitats.component';
import { ProprietaireComponent } from './../proprietaire.component';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Reservation } from 'src/app/models/reservation.model.ts';
import { environment } from 'src/environments/environment';
import { ReservationsService } from 'src/app/services/reservations.service';
import { ReservationList } from 'src/app/models/reservationList.model';

@Component({
  selector: 'app-reservations-list',
  templateUrl: './reservations-list.component.html',
  styleUrls: ['./reservations-list.component.css']
})
export class ReservationsListComponent implements OnInit {

  serverUrl = environment.SERVER_URL
  reservations: ReservationList[] = []
  reservationsList: ReservationList[] = []
  constructor(private router: Router, private reservationService: ReservationsService,private prop: ProprietaireComponent) { }

  ngOnInit(): void {
    this.getUservations()
  }
  getUservations(){
    this.reservationService.getReservList().subscribe(
      (res) => {
        this.reservationsList = res["hydra:member"]
        for(let reserv of this.reservationsList){
             if(reserv.habitat.user.id == this.prop.currentUser.id){
              this.reservations.push(reserv)
             }
        }
     }
    )
  }


  voirReservation(reservId: number) {
    this.router.navigate(['proprietaire/reservations', reservId])
  }
  

}
