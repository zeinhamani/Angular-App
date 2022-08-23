import { User } from './../../models/user.model.ts';
import { Credentials } from './../cridentials';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  errorMessage!: string;
  faTimes = faTimes;
  signupForm!: FormGroup
  token!: {exp:number,iat:number,username:string,roles:string[]}
  role!: string
  loginStatus = false
  constructor(private formBuilder: FormBuilder, 
               private authService: AuthService,
               private userService: UsersService,
               private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]   
    })
  }

  Seconnecter(){
    if (this.signupForm.invalid) { return ; }

    
    this.authService.login(this.signupForm.value).subscribe(
      resultat => {
          this.loginStatus = true
          this.token = jwtDecode(resultat.token)
          this.role = this.token.roles[0]
          switch (this.role) {
            case 'ROLE_ADMIN':
              this.router.navigateByUrl('/Admin');
              break;
            case 'ROLE_PROP':
              this.router.navigateByUrl('/proprietaire');
              break;
            case 'ROLE_LOC':
              this.router.navigateByUrl('/Locataire');
              break;
            default:
              console.log(`Sorry, we are out of ${this.role}.`);
          }
        this.errorMessage = '';
        
      },
      error => {
     

        if (error.status === 401) {
          this.errorMessage =
            'Nous n\'avons pas trouvé de compte utilisateur qui corresponde avec cet email et ce mot de passe';

          return;
        }

        this.errorMessage =
          'Un problème est survenu, veuillez ré-essayer plus tard';
      }
    );
  }

  
      
  }
  

