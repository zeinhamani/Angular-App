import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { User } from './../../models/user.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { comparePasswords } from 'src/app/shared/password.validator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up-locataire',
  templateUrl: './sign-up-locataire.component.html',
  styleUrls: ['./sign-up-locataire.component.css']
})
export class SignUpLocataireComponent implements OnInit {

  signupForm!: FormGroup ;
  user!: User
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }

  get nom() {
    return this.signupForm.get('nom')
  }
  get email() {
    return this.signupForm.get('email')
  }
  get password() {
    return this.signupForm.get('passwords')?.get('password')
  }
  get confirmedPassword(){
    return this.signupForm.get('passwords')?.get('confirmed_password')
  }
  get conditions() {
    return this.signupForm.get('conditions')
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmed_password: ['', [Validators.required]],
      },{validators: comparePasswords}),
      conditions: [,[Validators.required]]     
    })
  }
  saveLocData(){
     var body = {
      nom: this.signupForm.value.nom,
      email: this.signupForm.value.email,
      password: this.signupForm.value.passwords.password,
      roles: ['ROLE_LOC']
    }
      console.log(body)
      this.userService.addUser(body).subscribe(
        (response) => {
          if(response) {
            this.toastr.success('Un nouveau utilisateur créer!', 'Bien enregistré!')
            this.router.navigate(['auth/signin']);
          } 
        }, (err) => {
          this.toastr.error('User name déja existé',"l'inscription échouée")
        }
      )
         
  }

}
