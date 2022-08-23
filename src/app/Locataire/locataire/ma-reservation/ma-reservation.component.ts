import { ReservationsService } from '../../../services/reservations.service';
import { Reservation } from '../../../models/reservation.model.ts';
import { Component, OnInit } from '@angular/core';
import {  faLevelDownAlt } from '@fortawesome/free-solid-svg-icons';
import {  faLevelUpAlt } from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CommentairesService } from 'src/app/services/commentaires.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-ma-reservation',
  templateUrl: './ma-reservation.component.html',
  styleUrls: ['./ma-reservation.component.css']
})
export class MaReservationComponent implements OnInit {

  serverUrl = environment.SERVER_URL 
  arrivee = faLevelDownAlt
  depart =  faLevelUpAlt
  reservation!: Reservation
  reservId!: string | null
  id!:number
  commentaireForm!: FormGroup
  numbers = [0,1,2,3,4,5]
  toggler!: boolean
  constructor(private reservationService: ReservationsService,private formBuilder: FormBuilder, private commService: CommentairesService,private activeRoute: ActivatedRoute,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    //this.reservation = this.reservationService.reservations[1]
    this.reservId  =  this.activeRoute.snapshot.paramMap.get('id')
    this.id = +!this.reservId
    if(this.reservId) {
      this.reservationService.getReservItem(+this.reservId).subscribe(
           (response) => {

           this.reservation = response 
           this.initForm() }
      )
    }
  }
  voirHabitat(id: number){
    this.router.navigate(['/habitats', id])
  }
  commenter(){
    this.toggler = !this.toggler;
  }
  initForm(){
    this.commentaireForm = this.formBuilder.group({
      comment: ['', Validators.required],
      evaluation: ['', Validators.required]
  })
  }
  publier(){
    if(this.reservId){
      const body = {
        contenu: this.commentaireForm.value.comment,
        evaluation: this.commentaireForm.value.evaluation[0],
        reservation:  `api/reservations/${this.reservId}`
      }
      console.log(body)
      this.commService.addComnt(body).subscribe(
        (res) => {
          this.toastr.success('', 'commentaire créer')
        },
        (err)=> {
          this.toastr.error('essayer une autre fois',"Un probleme survenue")
        }
      )
    }
   
  }


}
