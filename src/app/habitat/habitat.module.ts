import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HebergementsComponent } from './hebergements/hebergements.component';
import { HabitatItemComponent } from './hebergements/habitat-item/habitat-item.component';
import { AddReservationComponent } from './hebergements/habitat-item/add-reservation/add-reservation.component';
import { EquipementsComponent } from './hebergements/habitat-item/equipements/equipements.component';
import { HabitatServicesComponent } from './hebergements/habitat-item/habitat-services/habitat-services.component';
import { CommentairesComponent } from './hebergements/habitat-item/commentaires/commentaires.component';
import { ContactComponent } from './hebergements/habitat-item/contact/contact.component';
import { HabitatListComponent } from './hebergements/habitat-list/habitat-list.component';
import { Routes, RouterModule } from '@angular/router';
import { MapToIterable } from '../pipes';

const habitatRoutes: Routes = [
            { path: 'hebergements', component: HebergementsComponent},
            {path: 'habitats', component: HabitatListComponent},
            {path: 'habitats/:id', component: HabitatItemComponent}
  ]

@NgModule({
  declarations: [
    HebergementsComponent,
    HabitatListComponent,
    HabitatItemComponent,
    ContactComponent,
    AddReservationComponent,
    EquipementsComponent,
    HabitatServicesComponent,
    CommentairesComponent,
    MapToIterable
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(habitatRoutes)
  ]
})
export class HabitatModule { }
