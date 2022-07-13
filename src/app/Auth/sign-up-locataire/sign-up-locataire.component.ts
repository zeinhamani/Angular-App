import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { Credentials } from './../cridentials';
import { User } from './../../models/user.model.ts';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-sign-up-locataire',
  templateUrl: './sign-up-locataire.component.html',
  styleUrls: ['./sign-up-locataire.component.css']
})
export class SignUpLocataireComponent implements OnInit {

  signupForm!: FormGroup ;
  user!: User
  
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) { }

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
    return this.signupForm.get('password')
  }
  get confirmedPassword(){
    return this.signupForm.get('confirmed_password')
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmed_password: ['', [Validators.required]],
      roles: ['ROLE_LOC']     
    }, {validator: PasswordValidator})
  }
  saveLocData(){
    
      this.userService.addUser(this.signupForm.value).subscribe(
        (response) => {
          if(response) {
            this.router.navigate(['/auth/signin']);
          }
        }
      )
         
  }

}
