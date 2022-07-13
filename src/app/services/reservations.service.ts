import { HabitatsService } from './habitats.service';
import { UsersService } from './users.service';
import { Reservation } from './../models/reservation.model.ts';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  
   private RESERV_URL = environment.RESERVATIONS_URL
   constructor(private http: HttpClient ){}


   getReservList(): Observable<any> {
    return this.http.get<any>(this.RESERV_URL).pipe(
     tap( (response) => {
       console.table(response)
     },
     catchError(  (error ) => this.handleError(error, [])

   )));
 }

 addReserv( value: any): Observable<any> {
   const httpOptions = {
     headers: new HttpHeaders({'content-Type': 'application/ld+json'})
   }
    return this.http.post(`${this.RESERV_URL}`, value, httpOptions).pipe(
     tap( (response) => {
       this.log(response)
     },
     catchError( (error) => this.handleError(error, undefined))
    ));
 }
 getReservItem(ReservId: number): Observable<any> {
    return this.http.get<any>(`${this.RESERV_URL}/${ReservId}`).pipe(
     tap( (habitat) => {
       this.log(habitat)
     },
     catchError( (error) => this.handleError(error, undefined))

   ));
 }

 updatedReserv(ReservId: number, value: any): Observable<any> {
   const httpOptions = {
     headers: new HttpHeaders({'content-Type': 'application/ld+json'})
   }
    return this.http.put(`${this.RESERV_URL}/${ReservId}`, value, httpOptions).pipe(
     tap( (response) => {
       this.log(response)
     },
     catchError( (error) => this.handleError(error, undefined))
    ));
 }
  deleteReserv(ReservId: number): Observable<any>{
   return this.http.delete(`${this.RESERV_URL}/${ReservId}`).pipe(
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
