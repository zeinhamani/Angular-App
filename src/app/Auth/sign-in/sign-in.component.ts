import { User } from './../../models/user.model.ts';
import { Credentials } from './../cridentials';
import { Router } from '@angular/router';
import { UsersService } from './../../services/users.service';
import { AuthService } from '../auth.service';
import { Component, OnInit } from '@angular/core';
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
        this.errorMessage = '';
        this.router.navigateByUrl('/habitats');
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
  

