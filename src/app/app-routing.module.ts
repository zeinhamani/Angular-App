import { ContactComponent } from './habitat/hebergements/habitat-item/contact/contact.component';
import { AuthGuard } from './auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from '@angular/router';
import { SignUpLocataireComponent } from './Auth/sign-up-locataire/sign-up-locataire.component';
import { SignUpProprietaireComponent } from './Auth/sign-up-proprietaire/sign-up-proprietaire.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { ClientComponent } from './client/client.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactezNousComponent } from './client/contactez-nous/contactez-nous.component';



const routes: Routes = [
  
  {path: 'contact', component: ContactezNousComponent},
   {path: 'Client', component: ClientComponent},
   {path: 'accueil', component: AccueilComponent},
   {path:'', redirectTo: 'accueil', pathMatch: 'full'},
   { path: '**', component: PageNotFoundComponent}
]
@NgModule({
  declarations: [
    ClientComponent,
    ContactezNousComponent,
    PageNotFoundComponent,
    AccueilComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    RouterModule.forRoot(routes)

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
