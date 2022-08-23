import { User } from './../../../../models/user.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  signupForm!: FormGroup ;
  dropdownList!: any[];
  selectedItems!: any[];
  dropdownSettings!:IDropdownSettings;
  user!: User
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  telPtn = '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/'
  constructor(private formBuilder: FormBuilder,  
              private userService: UsersService, 
              private router: Router, 
              private toastr: ToastrService,
              private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.dropdownSettings = {
      singleSelection: true,
      allowRemoteDataSearch: true,
      idField: 'role_id',
      textField: 'role_nom',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
    this.dropdownList = [
      { role_id: 1, role_nom: 'Admin' },
      { role_id: 3, role_nom: 'Proprietaire' },
      { role_id: 4, role_nom: 'Locataire' }
    ];
    this.initForm();
  }
  get nom() {
    return this.signupForm.get('nom')
  }
  get tel() {
    return this.signupForm.get('tel')
  }
  getRole(){
    return this.signupForm.get('role')
  }
  initForm(){
    const userId: string | null = this.activeRoute.snapshot.paramMap.get('id')
    if(userId) {
      this.userService.getUserItem(+userId).subscribe(
        (res) => {
          this.user = res
          this.getUserRole(this.user.roles[0])
          this.signupForm = this.formBuilder.group({
            nom: [this.user.nom, [Validators.required,Validators.minLength(3)]],
            tel: ['', Validators.required],
            role:['',Validators.required]   
          })
        }
      )
   
    }
}
   getUserRole(role:any){
      switch (role) {
      case 'ROLE_ADMIN':
        this.selectedItems.push({role_id: 1, role_nom: 'Admin'})
        break;
      case 'ROLE_PROP':
        this.selectedItems.push({role_id: 2, role_nom: 'Proprietaire'})
        break;
      case 'ROLE_LOC':
        this.selectedItems.push({role_id: 3, role_nom: 'Locataire'})
        break;
      default:
        console.log(`Sorry, we are out of ${role}.`);
    }

  } 
  getRoles(drop:any){
    let role = ['']
    switch (drop.role_id) {
      case 1:
        role = ['ROLE_ADMIN']
        break;
      case 2:
        role = ['ROLE_PROP']
        break;
      case 3:
        role = ['ROLE_LOC']
        break;
      default:
        console.log(`Sorry, we are out of ${role}.`);
    }
    return role
  }
  editUserData(){
    var body = {
      nom: this.signupForm.value.nom,
      tel: this.signupForm.value.tel,
      roles: this.getRoles(this.signupForm.value.role) 
    }
    console.log(body)
    this.userService.updatedUser(this.user.id,body).subscribe(
      (response) => {
        if(response) {
          this.toastr.success('Un nouveau utilisateur créer!', 'Bien enregistré!')
          this.router.navigate(['Admin/users']);
        } 
      }, (err) => {
        this.toastr.error('User name déja existé',"l'inscription échouée")
      }
    )
  }


  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

}
