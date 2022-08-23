import { UserList } from './../../../models/userList.model';
import { UsersService } from './../../../services/users.service';
import { User } from './../../../models/user.model.ts';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  addIcon = faPlus
  edit = faEdit
  delete = faTrash
  users!: UserList[]
  totalLength!: number;
  serverUrl = environment.SERVER_URL
  userImage = 'assets/user.png'
  p: number = 1;
  
  constructor(private userService: UsersService,private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {

    this.getUsers()
   }
   getUsers(){
     this.userService.getUserList().subscribe(
       (response) => {
        this.users = response["hydra:member"]
        this.totalLength = response["hydra:totalItems"]
      }
     )
   }
   addUser(){
    this.router.navigate(['Admin/users/add'])
   }


   supprimer(id:number){
    this.userService.deleteUser(id).subscribe(
      (res) => this.toastr.success('cette reservation est supprimée!', 'Bien supprimmer!'),
      (err) => this.toastr.error('essayer plus tard',"suppression, échouée")
    )
  }


}
