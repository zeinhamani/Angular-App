import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { RolePermissionGuard } from 'src/app/role-permission.guard';
import { AuthGuard } from 'src/app/auth.guard';
import { HabitatsComponent } from './habitats/habitats.component';
import { UsersComponent } from './users/users.component';
import { ListDestinationsComponent } from './list-destinations/list-destinations.component';
import { CategoryComponent } from './category/category.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { CommentsComponent } from './comments/comments.component';
import { ListEquipementsComponent } from './list-equipements/list-equipements.component';
import { ListServicesComponent } from './list-services/list-services.component';
import { NotifierComponent } from './notifier/notifier.component';
import { BoxMailComponent } from './box-mail/box-mail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { EditCategoryComponent } from './category/edit-category/edit-category.component';
import { AddHabitatComponent } from './habitats/add-habitat/add-habitat.component';
import { EditHabitatComponent } from './habitats/edit-habitat/edit-habitat.component';
import { AddReservationComponent } from './reservations/add-reservation/add-reservation.component';
import { EditReservationComponent } from './reservations/edit-reservation/edit-reservation.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { AddDestinationComponent } from './list-destinations/add-destination/add-destination.component';
import { EditDestinationComponent } from './list-destinations/edit-destination/edit-destination.component';
import { EditServiceComponent } from './list-services/edit-service/edit-service.component';
import { AddServiceComponent } from './list-services/add-service/add-service.component';
import { AddEquipementComponent } from './list-equipements/add-equipement/add-equipement.component';
import { EditEquipementComponent } from './list-equipements/edit-equipement/edit-equipement.component';

const adminRoutes: Routes = [
  {
    path: 'admin', 
    component: DashboardComponent,
    canActivate: [AuthGuard,RolePermissionGuard],
    data: {
      role: 'ROLE_ADMIN'
    },
    children: [

        {path: 'habitats',component: HabitatsComponent},
        {path: 'habitats/:id',component: EditHabitatComponent},
        {path:'add', component: AddHabitatComponent},

        {path: 'users', component: UsersComponent},
        {path:'users/:id', component: EditUserComponent},
        {path:'users/add', component: AddUserComponent},

        {path: 'categories', component: CategoryComponent},
        {path: 'categories/:id', component: EditCategoryComponent},
        {path:'categories/add', component: AddCategoryComponent},

        {path: 'destinations',component: ListDestinationsComponent},
        {path: 'destinations/:id',component: EditDestinationComponent},
        {path:'destinations/add', component: AddDestinationComponent},
         
        {path: 'reservations',component: ReservationsComponent},
        {path: 'reservations/:id',component: EditReservationComponent},
        {path: 'reservations/add', component: AddReservationComponent},
         
        {path: 'commentaires', component: CommentsComponent},

        {path: 'equipements',component: ListEquipementsComponent},
        {path: 'equipements/:id',component: EditEquipementComponent},
        {path: 'equipements/add', component: AddEquipementComponent},
         
        {path: 'services', component: ListServicesComponent},
        {path: 'services/:id', component: EditServiceComponent},
        {path:'services/add', component: AddServiceComponent},
        
        {path: 'notifier', component: NotifierComponent},
        {path: 'mail', component: BoxMailComponent}

   ]
   },
]


@NgModule({
  declarations: [
    DashboardComponent,
    HabitatsComponent,
    UsersComponent,
    CategoryComponent,
    ReservationsComponent,
    ListDestinationsComponent,
    ListEquipementsComponent,
    ListServicesComponent,
    NotifierComponent,
    BoxMailComponent,
    CommentsComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    AddHabitatComponent,
    EditHabitatComponent,
    AddReservationComponent,
    EditReservationComponent,
    EditUserComponent,
    AddUserComponent,
    AddDestinationComponent,
    EditDestinationComponent,
    EditServiceComponent,
    AddServiceComponent,
    AddEquipementComponent,
    EditEquipementComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
