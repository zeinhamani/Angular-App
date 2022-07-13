import { UserList } from './../../../models/userList.model';
import { UsersService } from './../../../services/users.service';
import { User } from './../../../models/user.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addIcon = faPlus
  users!: UserList[]
  constructor(private userService: UsersService) { }

  ngOnInit(): void {

    this.getUsers()
   }
   getUsers(){
     this.userService.getUserList().subscribe(
       (response) => this.users = response["hydra:member"]
     )
   }
   

}
