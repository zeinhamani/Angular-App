import { AdminModule } from './Admin/dashboard/admin.module';
import { PropModule } from './Proprietaire/proprietaire/prop.module';
import { LocModule } from './Locataire/locataire/loc.module';
import { AttypikInterceptor } from './attypik.interceptor';
import { AuthModule } from './Auth/auth.module';
import { HabitatModule } from './habitat/habitat.module';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './Auth/auth.service';
import { CategoriesService } from './services/categories.service';
import { CommentairesService } from './services/commentaires.service';
import { DestinationsService } from './services/destinations.service';
import { EquipementsService } from './services/equipements.service';
import { HabitatServicesService } from './services/habitat-services.service';
import { HabitatsService } from './services/habitats.service';
import { MediasService } from './services/medias.service';
import { ReservationsService } from './services/reservations.service';
import { ClientComponent } from './client/client.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HeaderComponent } from './client/header/header.component';
import { FooterComponent } from './client/footer/footer.component';
import { AccueilComponent } from './client/accueil/accueil.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { ContactezNousComponent } from './client/contactez-nous/contactez-nous.component';
import { MentionsLegalesComponent } from './client/mentions-legales/mentions-legales.component';
import { QuiSommesNousComponent } from './client/qui-sommes-nous/qui-sommes-nous.component';
import { CGUComponent } from './client/cgu/cgu.component';
import { CGVComponent } from './client/cgv/cgv.component';



@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    PageNotFoundComponent,
    HeaderComponent,
    FooterComponent,
    AccueilComponent,
    DestinationsComponent,
    ContactezNousComponent,
    QuiSommesNousComponent,
    MentionsLegalesComponent,
    CGUComponent,
    CGVComponent,
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HabitatModule,
    AuthModule,
    LocModule,
    PropModule,
    AdminModule,
    AppRoutingModule,
    
  ],
  providers: [
    AuthService,
    CategoriesService,
    CommentairesService,
    DestinationsService,
    EquipementsService,
    HabitatServicesService,
    HabitatsService,
    MediasService,
    ReservationsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AttypikInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
