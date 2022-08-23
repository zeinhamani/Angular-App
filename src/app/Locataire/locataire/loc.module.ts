import { LocataireComponent } from './locataire.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth.guard';
import { RolePermissionGuard } from 'src/app/role-permission.guard';
import { MaReservationComponent } from './ma-reservation/ma-reservation.component';
import { AddCommentaireComponent } from './add-commentaire/add-commentaire.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingComponent } from './setting/setting.component';


const locRoutes: Routes =[
  {
    path: 'Locataire', 
    component: LocataireComponent,
    canActivate: [AuthGuard,RolePermissionGuard],
    data: {
      role: 'ROLE_LOC'
    },
    children: [
     {path: 'reservations', component: MesReservationsComponent},
     {path: 'reservations/:id', 
      component: MaReservationComponent,
      children: [{path: 'commenter', component: AddCommentaireComponent}]
      },
      {path: 'setting', component: SettingComponent} 
   ]
  },
]
@NgModule({
  declarations: [
    LocataireComponent,
    MesReservationsComponent,
    MaReservationComponent,
    AddCommentaireComponent,
    SettingComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(locRoutes)
  ]
})
export class LocModule { }
