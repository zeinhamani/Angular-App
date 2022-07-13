import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { SignUpLocataireComponent } from './sign-up-locataire/sign-up-locataire.component';
import { SignUpProprietaireComponent } from './sign-up-proprietaire/sign-up-proprietaire.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



const routes : Routes = [
  {path: 'signupLocataire', component: SignUpLocataireComponent},
  {path: 'signupProprietaire', component: SignUpProprietaireComponent },
  {path: 'signin', component: SignInComponent}
]
@NgModule({
  declarations: [
    SignUpLocataireComponent,
    SignUpProprietaireComponent,
    SignInComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: Storage,
      useValue: window.localStorage
    }
  ]
})
export class AuthModule { }
