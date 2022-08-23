import { map } from 'rxjs/operators';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model.ts';
import { AuthService } from './../../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HabitatsService } from 'src/app/services/habitats.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-locataire',
  templateUrl: './locataire.component.html',
  styleUrls: ['./locataire.component.css']
})
export class LocataireComponent implements OnInit {
  
  // users: any = {}
  resrvIcon  = faSuitcaseRolling
  settIcon = faWrench
  logOut =  faSignOutAlt
  serverUrl = environment.SERVER_URL
  userImage = 'assets/user.png'
  currentUser!: User
  id!: number
  constructor(private authService: AuthService ,
              private userService:UsersService ) { }

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
                 this.userImage = this.serverUrl + this.currentUser.media.url
               }
            )
          }
        }
         
      }
    )
  }
}
  


