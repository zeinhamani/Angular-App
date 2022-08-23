import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationsService } from 'src/app/services/notifications.service';
import { UserList } from 'src/app/models/userList.model';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css']
})
export class NotifierComponent implements OnInit {

  
  notifForm!: FormGroup
  
  users!: UserList[]
  dropdownList!: any[];
  selectedItems = [];
  dropdownSettings!:IDropdownSettings;
  constructor(private formBuilder: FormBuilder, private notifService: NotificationsService, private userService: UsersService){}
 
  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      allowRemoteDataSearch: true,
      idField: 'id',
      textField: 'email',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
    this.initForm();

  }

  get content() {
    return this.notifForm.get('content')
  }
 
  initForm(){
    this.notifForm = this.formBuilder.group({
      content: ['', [Validators.required,Validators.minLength(3)]],
      user: [Validators.required],     
    })
    this.getUsers()
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  getUsers(){
    this.userService.getUserList().subscribe(
      (response) => {
        let tmp = []
        this.users = response["hydra:member"]
        for(let user of this.users) {
          const id = user.id
          const nom = user.email
          const elem = {id:id,email:nom}
          tmp.push(elem)
        }
        this.dropdownList = tmp
      }
    )
  }
 
  creerNotif(){
       const form = this.notifForm.value
      var body = {
        content: this.notifForm.value.content,
        user: `api/users/${form.user[0].id}`
      }
       this.notifService.addNOTIF(this.notifForm.value).subscribe(
        () => console.log('done')
       )
  }

}
