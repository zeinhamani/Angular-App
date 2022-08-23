import { User } from './../models/user.model.ts';
import { AuthService } from "../Auth/auth.service"
import { UsersService } from "../services/users.service"
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class CurrentUser {

    
    constructor(private authService: AuthService, private userService: UsersService){
    }

    getCurrentUser(user:User)  { 
        this.userService.getUserList().subscribe(
          (response) => {
             const users =  response["hydra:member"]
             for(const key of Object.keys(users) ){
              console.log(`${key} => ${users[key].email}`)
              if(users[key].email === this.authService.getTokenData().username){
                this.userService.getUserItem(users[key].id).subscribe(
                   (res) => {
                    console.log(res)
                     user =  res 
                   }
                )
              }
            }  
          }
        )
    }
}