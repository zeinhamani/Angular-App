import { AuthGuard } from './auth.guard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MaReservationComponent } from './Locataire/locataire/ma-reservation/ma-reservation.component';
import { AddCommentaireComponent } from './Locataire/locataire/add-commentaire/add-commentaire.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule , Routes} from '@angular/router';
import { SignUpLocataireComponent } from './Auth/sign-up-locataire/sign-up-locataire.component';
import { SignUpProprietaireComponent } from './Auth/sign-up-proprietaire/sign-up-proprietaire.component';
import { SignInComponent } from './Auth/sign-in/sign-in.component';
import { ClientComponent } from './client/client.component';
import { DashboardComponent } from './Admin/dashboard/dashboard.component';
import { HabitatsComponent } from './Admin/dashboard/habitats/habitats.component';
import { UsersComponent } from './Admin/dashboard/users/users.component';
import { CategoryComponent } from './Admin/dashboard/category/category.component';
import { ListDestinationsComponent } from './Admin/dashboard/list-destinations/list-destinations.component';
import { ReservationsComponent } from './Admin/dashboard/reservations/reservations.component';
import { CommentsComponent } from './Admin/dashboard/comments/comments.component';
import { ListServicesComponent } from './Admin/dashboard/list-services/list-services.component';
import { ListEquipementsComponent } from './Admin/dashboard/list-equipements/list-equipements.component';
import { NotifierComponent } from './Admin/dashboard/notifier/notifier.component';
import { BoxMailComponent } from './Admin/dashboard/box-mail/box-mail.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { QuiSommesNousComponent } from './client/qui-sommes-nous/qui-sommes-nous.component';
import { ContactezNousComponent } from './client/contactez-nous/contactez-nous.component';
import { MentionsLegalesComponent } from './client/mentions-legales/mentions-legales.component';
import { CGUComponent } from './client/cgu/cgu.component';
import { CGVComponent } from './client/cgv/cgv.component';
import { RolePermissionGuard } from './role-permission.guard';


const routes: Routes = [
  
  {path: 'Client', 
  component: ClientComponent,
  children: [
    {path: 'auth/signupLocataire', component: SignUpLocataireComponent},
    {path: 'auth/signupProprietaire', component: SignUpProprietaireComponent },
    {path: 'auth/signin', component: SignInComponent},
  
  ]
},
  
   {path: 'auth/signupLocataire', component: SignUpLocataireComponent},
   {path: 'auth/signupProprietaire', component: SignUpProprietaireComponent },
   {path: 'auth/signin', component: SignInComponent},
   {path: 'accueil', component: AccueilComponent},
   {path:'', redirectTo: 'accueil', pathMatch: 'full'},
   { path: '**', component: PageNotFoundComponent}
]
@NgModule({
  declarations: [],
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
