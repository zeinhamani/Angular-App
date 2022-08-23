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
import { MediasComponent } from './medias/medias.component';
import { AddMediaComponent } from './medias/add-media/add-media.component';
import { EditMediaComponent } from './medias/edit-media/edit-media.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import {NgxPaginationModule} from 'ngx-pagination';

const adminRoutes: Routes = [
  {
    path: 'Admin', 
    component: DashboardComponent,
    canActivate: [AuthGuard,RolePermissionGuard],
    data: {
      role: 'ROLE_ADMIN'
    },
    children: [
        
      {path: 'habitats',component: HabitatsComponent},
      {path:'habitats/add', component: AddHabitatComponent},
      {path: 'habitats/:id',component: EditHabitatComponent},
      

        {path: 'users', component: UsersComponent},
        {path:'users/add', component: AddUserComponent},
        {path:'users/:id', component: EditUserComponent},
        
        

        {path: 'categories', component: CategoryComponent},
        {path:'categories/add', component: AddCategoryComponent},
        {path: 'categories/:id', component: EditCategoryComponent},
       

        {path: 'destinations',component: ListDestinationsComponent},
        {path:'destinations/add', component: AddDestinationComponent},
        {path: 'destinations/:id',component: EditDestinationComponent},
        
         
        {path: 'reservations',component: ReservationsComponent},
        {path: 'reservations/add', component: AddReservationComponent},
        {path: 'reservations/:id',component: EditReservationComponent},
        
         
        {path: 'commentaires', component: CommentsComponent},

        {path: 'equipements',component: ListEquipementsComponent},
        {path: 'equipements/add', component: AddEquipementComponent},
        {path: 'equipements/:id',component: EditEquipementComponent},
         
        {path: 'services', component: ListServicesComponent},
        {path:'services/add', component: AddServiceComponent},
        {path: 'services/:id', component: EditServiceComponent},
        

        {path: 'medias', component: MediasComponent},
        {path:'medias/add', component: AddMediaComponent},
        {path: 'medias/:id', component: EditMediaComponent},
        
        
        
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
    MediasComponent,
    AddMediaComponent,
    EditMediaComponent,
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminModule { }
