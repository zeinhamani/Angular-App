import { LocataireComponent } from './../../../../Locataire/locataire/locataire.component';
import { ReservationsService } from './../../../../services/reservations.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Auth/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/user.model.ts';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.css']
})
export class AddReservationComponent implements OnInit {

  reservForm!: FormGroup ;
  currentUser!: User
  user = `api/users/${this.loc.currentUser.id}`
  constructor(private formBuilder: FormBuilder, 
              private reserService: ReservationsService,
              private loc: LocataireComponent
              ) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.reservForm = this.formBuilder.group({
      date_arrivee: ['', Validators.required],
      date_depart: ['', Validators.required],
      personnes: ['', Validators.required],
      user: [this.user, Validators.required]     
    })
  }
 
  reserver() {
         this.reserService.addReserv(this.reservForm.value).subscribe(
          () => console.log('')
         )
  }
}
