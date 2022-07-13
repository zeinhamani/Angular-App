import { Destination } from './../models/destination.model.ts';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationsService {

  private DEST_URL = environment.DESTINATIONS_URL
     constructor(private http: HttpClient ){}


     getDestList(): Observable<any> {
      return this.http.get<any>(this.DEST_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addDest( value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.post(`${this.DEST_URL}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   getDestItem(DestId: number): Observable<any> {
      return this.http.get<any>(`${this.DEST_URL}/${DestId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedDest(DestId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.DEST_URL}/${DestId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteDest(DestId: number): Observable<any>{
     return this.http.delete(`${this.DEST_URL}/${DestId}`).pipe(
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
