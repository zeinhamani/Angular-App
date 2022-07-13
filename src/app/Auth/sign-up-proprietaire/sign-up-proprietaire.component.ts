import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { PasswordValidator } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-sign-up-proprietaire',
  templateUrl: './sign-up-proprietaire.component.html',
  styleUrls: ['./sign-up-proprietaire.component.css']
})
export class SignUpProprietaireComponent implements OnInit {

  signupForm!: FormGroup ;
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  telPtn = '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/'
  constructor(private formBuilder: FormBuilder,  private userService: UsersService, private router: Router) { }

  ngOnInit(): void {
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
    return this.signupForm.get('password')
  }
  get confirmedPassword(){
    return this.signupForm.get('confirmed_password')
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      prenom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmed_password: ['', Validators.required],
      roles: ['ROLE_PROP']      
    },{ Validators: PasswordValidator})
  }
  savePropData(){
    this.userService.addUser(this.signupForm.value).subscribe(
      (response) => {
        if(response) {
          this.router.navigate(['/auth/signin']);
        }
      }
    )
  }
}
