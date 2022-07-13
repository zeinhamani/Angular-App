import { Equipement } from './../models/equipement.model.ts';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementsService {

 
  private EQUIP_URL = environment.EQUIPEMENTS_URL
     constructor(private http: HttpClient ){}


     getEquipList(): Observable<any> {
      return this.http.get<any>(this.EQUIP_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addEquip( value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.post(`${this.EQUIP_URL}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   getEquipItem(EquipId: number): Observable<any> {
      return this.http.get<any>(`${this.EQUIP_URL}/${EquipId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedEquip(EquipId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.EQUIP_URL}/${EquipId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteEquip(EquipId: number): Observable<any>{
     return this.http.delete(`${this.EQUIP_URL}/${EquipId}`).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
    } 
     private log(response: any) {
      console.log(response)
     }
     private handleError(error:Error, errorValue: []|undefined){
       console.error(error)
       return of(errorValue)
     }
  
  
}
