import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CategoriesService } from './categories.service';
import { Habitat } from 'src/app/models/habitat.model.ts';
import { UsersService } from './users.service';
import { EquipementsService } from './equipements.service';
import { Injectable } from '@angular/core';
import { MediasService } from './medias.service';
import { HabitatServicesService } from './habitat-services.service';
import { Observable, of  } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HabitatsService {
 

  private HABITAT_URL = environment.HABITATS_URL
  private habitats: Habitat[] = []
  private habitat!: Habitat
  constructor(
              private http: HttpClient,
              private medias: MediasService, 
              private services: HabitatServicesService, 
              private equipements: EquipementsService, 
              private userService: UsersService, 
              private categorieService: CategoriesService) { }
  
  getHabitatList(): Observable<any> {
     return this.http.get<any>(this.HABITAT_URL).pipe(
      tap( (habitatList) => {
        console.table(habitatList)
      },
      catchError(  (error ) => this.handleError(error, [])

    )));
  }

  addHabitat( value: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/ld+json'})
    }
     return this.http.post(`${this.HABITAT_URL}`, value, httpOptions).pipe(
      tap( (response) => {
        this.log(response)
      },
      catchError( (error) => this.handleError(error, undefined))
     ));
  }
  getHabitatItem(habitatId: number): Observable<any> {
     return this.http.get<any>(`${this.HABITAT_URL}/${habitatId}`).pipe(
      tap( (habitat) => {
        this.log(habitat)
      },
      catchError( (error) => this.handleError(error, undefined))

    ));
  }

  updatedHabitat(habitatId: number, value: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({'content-Type': 'application/ld+json'})
    }
     return this.http.put(`${this.HABITAT_URL}/${habitatId}`, value, httpOptions).pipe(
      tap( (response) => {
        this.log(response)
      },
      catchError( (error) => this.handleError(error, undefined))
     ));
  }
   deleteHabitat(habitatId: number): Observable<any>{
    return this.http.delete(`${this.HABITAT_URL}/${habitatId}`).pipe(
      tap( (response) => {
        this.log(response)
      },
      catchError( (error) => this.handleError(error, undefined))
     ));
   }
   searchByTitle(titre: string):Observable<any>{
    return this.http.get<any>(`${this.HABITAT_URL}?titre=${titre}`).pipe(
      tap( (habitatList) => {
        console.table(habitatList)
      },
      catchError(  (error ) => this.handleError(error, [])

    )));
   } 

   private log(response: any) {
    console.log(response)
   }
   private handleError(error:Error, errorValue: []|undefined){
     console.error(error)
     return of(errorValue)
   }
   
}