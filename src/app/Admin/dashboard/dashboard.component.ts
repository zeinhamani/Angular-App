import { CurrentUser } from './../../shared/current-user';
import { Component, OnInit } from '@angular/core';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { faCampground } from '@fortawesome/free-solid-svg-icons';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSuitcaseRolling } from '@fortawesome/free-solid-svg-icons';
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Auth/auth.service';
import { User } from 'src/app/models/user.model.ts';
import { UsersService } from 'src/app/services/users.service';





@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  habitat  = faCampground 
  users = faUsers
  category = faClipboardList
  destination = faMapMarkerAlt 
  reservation = faSuitcaseRolling
  service = faConciergeBell
  equipement = faBed
  media = faImages
  message = faPaperPlane 
  comments = faComments
  box =  faEnvelope
  logOut =  faSignOutAlt
  toggler = false
  currentUser!: User
  constructor(private authService: AuthService , private userService:UsersService,private user: CurrentUser) { }

  ngOnInit(): void {
    this.getCurrentUser()
    //this.user.getCurrentUser(this.currentUser )
    
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
                 console.log(this.currentUser.id)
               }
            )
          }
        }  
      }
    )
  }
  menuToggle() {
    this.toggler = !this.toggler;
  }

}
