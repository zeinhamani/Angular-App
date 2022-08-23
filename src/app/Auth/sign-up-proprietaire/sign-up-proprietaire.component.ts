import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsersService } from 'src/app/services/users.service';
import { comparePasswords, Validcondition } from 'src/app/shared/password.validator';

@Component({
  selector: 'app-sign-up-proprietaire',
  templateUrl: './sign-up-proprietaire.component.html',
  styleUrls: ['./sign-up-proprietaire.component.css']
})
export class SignUpProprietaireComponent implements OnInit {

  signupForm!: FormGroup ;
  passwordPtn = '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$'
  telPtn = '/^(?:(?:\+|00)33[\s.-]{0,3}(?:\(0\)[\s.-]{0,3})?|0)[1-9](?:(?:[\s.-]?\d{2}){4}|\d{2}(?:[\s.-]?\d{3}){2})$/'
  constructor(private formBuilder: FormBuilder,  private userService: UsersService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initForm();
  }
  get nom() {
    return this.signupForm.get('nom')
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
  get conditions() {
    return this.signupForm.get('conditions')
  }
  initForm(){
    this.signupForm = this.formBuilder.group({
      nom: ['', [Validators.required,Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', Validators.required],
      passwords: this.formBuilder.group({
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmed_password: ['', [Validators.required]],
      },{validators: comparePasswords}),
      conditions: [,[Validators.required]]
        
    },{validators: Validcondition})
  }
 
  savePropData(){
    var body = {
      nom: this.signupForm.value.nom,
      email: this.signupForm.value.email,
      tel: this.signupForm.value.tel,
      password: this.signupForm.value.passwords.password,
      roles: ['ROLE_PROP']
    }
    console.log(body)
    this.userService.addUser(body).subscribe(
      (response) => {
        if(response) {
          this.toastr.success('Un nouveau utilisateur créer!', 'Bien enregistré!')
          this.router.navigate(['auth/signin']);
        } 
      }, (error) => {
        this.toastr.error(error,"l'inscription échouée")
      }
    )
  }
}
