import { Component, OnInit } from '@angular/core';
import { UsersService } from './../../../services/users.service';
import { UserList } from './../../../models/userList.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';

@Component({
  selector: 'app-box-mail',
  templateUrl: './box-mail.component.html',
  styleUrls: ['./box-mail.component.css']
})
export class BoxMailComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private notifService: NotificationsService, private userService: UsersService){}
  notifForm!: FormGroup
  users!: UserList

  ngOnInit(): void {
    this.initForm();
  }


 
  initForm(){
    this.notifForm = this.formBuilder.group({
      content: ['', [Validators.required,Validators.minLength(3)]],
      user: [Validators.required],     
    })
  }

  getUsers(){
    this.userService.getUserList().subscribe(
      response => this.users = response["hydra:member"]
    )
  }
  creerNotif(){
       this.notifService.addNOTIF(this.notifForm.value).subscribe(
        () => console.log('done')
       )
  }
}
