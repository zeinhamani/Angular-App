import { Component, OnInit } from '@angular/core';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';
import { User } from 'src/app/models/user.model.ts';
import { HabitatsService } from 'src/app/services/habitats.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-proprietaire',
  templateUrl: './proprietaire.component.html',
  styleUrls: ['./proprietaire.component.css']
})
export class ProprietaireComponent implements OnInit {

  habitIcon = faCampground
  resrvIcon  = faSuitcaseRolling
  NotIcon = faBell
  settIcon = faWrench
  logOut =  faSignOutAlt
  currentUser!: User
  id!: number
  constructor(private authService: AuthService , private userService:UsersService ) { }

  ngOnInit(): void {
    this.getCurrentUser()
  }  
  getCurrentUser() { 
    this.userService.getUserList().subscribe(
      (response) => {
         const users =  response["hydra:member"]
         for(const key of Object.keys( users) ){
          console.log(`${key} => ${users[key].email}`)
          if(users[key].email === this.authService.getTokenData().username){
            this.userService.getUserItem(users[key].id).subscribe(
               (res) => {
                 this.currentUser = res 
               }
            )
          }
        }  
      }
    )
  }
}
