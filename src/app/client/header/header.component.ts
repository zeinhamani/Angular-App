import { User } from 'src/app/models/user.model.ts';
import { UsersService } from './../../services/users.service';
import { AuthService } from './../../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CurrentUser } from 'src/app/shared/current-user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  toggler = false;
  faMicrosoft = faMicrosoft; 
  loginStatus!: boolean  
  currentUser!: User
  userImage = 'assets/user.png'
  serverUrl = environment.SERVER_URL
  username!: string
  constructor(private authService: AuthService, private router: Router, private userService: UsersService) { }

  ngOnInit(): void {
    this.authService.authState.subscribe(
      (val) => {
        this.loginStatus = val
        if(val){
          this.getCurrentUser()
        }
      }
    )
    
    console.log(this.loginStatus)
  }
  
  menuToggle() {
    this.toggler = !this.toggler; 
  }
  deconnecter() {
    //this.router.navigateByUrl()
    this.router.navigate(['auth/signin'])
    this.authService.logout()
    
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
                 this.username = this.currentUser.nom
                 this.userImage = this.serverUrl + this.currentUser.media.url
               }
            )
          }
        }  
      }
    )
}
}
