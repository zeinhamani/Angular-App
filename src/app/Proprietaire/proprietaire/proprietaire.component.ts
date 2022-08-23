import { CurrentUser } from './../../shared/current-user';
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
import { environment } from 'src/environments/environment';

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
  userImage = 'assets/user.png'
  serverUrl = environment.SERVER_URL
  id!: number
  constructor(private authService: AuthService , private router: Router, private userService:UsersService,private user: CurrentUser ) { }

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

  deconnecter() {
    //this.router.navigateByUrl()
    this.router.navigate(['auth/signin'])
    this.authService.logout()
    
  }
}
