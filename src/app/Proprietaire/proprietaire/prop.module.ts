import { AddHabitatComponent } from './add-habitat/add-habitat.component';
import { NotificationItemComponent } from './notification-item/notification-item.component';
import { NotificationListComponent } from './notification-list/notification-list.component';
import { ReservationItemComponent } from './reservation-item/reservation-item.component';
import { ReservationsListComponent } from './reservations-list/reservations-list.component';
import { EditHabitatComponent } from './edit-habitat/edit-habitat.component';
import { MesHabitatsComponent } from './mes-habitats/mes-habitats.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProprietaireComponent } from './proprietaire.component';
import { AuthGuard } from 'src/app/auth.guard';
import { RolePermissionGuard } from 'src/app/role-permission.guard';
import { RouterModule, Routes } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const propRoutes: Routes =[
  {
    path: 'proprietaire', 
    component: ProprietaireComponent,
    canActivate: [AuthGuard,RolePermissionGuard],
    data: {
      role: 'ROLE_PROP'
    },
    children: [
     {path: 'add', component: AddHabitatComponent},
     {path: 'mes-habitats', component: MesHabitatsComponent},
     {path: 'mes-habitats/:id', component: EditHabitatComponent},
     {path: 'reservations', component: ReservationsListComponent},
     {path: 'reservations/:id', component: ReservationItemComponent},
     {path: 'mes-notifications', component: NotificationListComponent},
     {path: 'mes-notifications/:id', component: NotificationItemComponent}

     
     
   ]
  },
]

@NgModule({
  declarations: [
    ProprietaireComponent,
    ReservationsListComponent,
    ReservationItemComponent,
    MesHabitatsComponent,
    AddHabitatComponent,
    EditHabitatComponent,
    NotificationListComponent,
    NotificationItemComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(propRoutes)
  ]
})
export class PropModule { }
