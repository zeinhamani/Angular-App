import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { comparePasswords, Validcondition } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  signupForm!: FormGroup ;
  dropdownList!: any[];
  selectedItems = [];
  dropdownSettings!:IDropdownSettings;
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  telPtn = '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/'
  constructor(private formBuilder: FormBuilder,  private userService: UsersService, private router: Router, private toastr: ToastrService) { }

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
  get prenom() {
    return this.signupForm.get('prenom')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get tel() {
    return this.signupForm.get('tel')
  }
  get password() {
    return this.signupForm.get('passwords')?.get('password')
  }
  get confirmedPassword(){
    return this.signupForm.get('passwords')?.get('confirmed_password')
  }
  getRole(){
    return this.signupForm.get('role')
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      prenom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmed_password: ['', [Validators.required]],
      },{validators: comparePasswords}),
      role:['',Validators.required]   
    })
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
  saveUserData(){
    var body = {
      nom: this.signupForm.value.nom,
      email: this.signupForm.value.email,
      tel: this.signupForm.value.tel,
      password: this.signupForm.value.passwords.password,
      roles: this.getRoles(this.signupForm.value.role) 
    }
    console.log(body)
    this.userService.addUser(body).subscribe(
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
