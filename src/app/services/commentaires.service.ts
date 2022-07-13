import { Injectable } from '@angular/core';
import { Commentaire } from '../models/commentaire.model.ts';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentairesService {
  private COMNT_URL = environment.COMENTAIRES_URL
     constructor(private http: HttpClient ){}


     getComntList(): Observable<any> {
      return this.http.get<any>(this.COMNT_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addComnt( value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.post(`${this.COMNT_URL}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   getComntItem(ComntId: number): Observable<any> {
      return this.http.get<any>(`${this.COMNT_URL}/${ComntId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedComnt(ComntId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.COMNT_URL}/${ComntId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteComnt(ComntId: number): Observable<any>{
     return this.http.delete(`${this.COMNT_URL}/${ComntId}`).pipe(
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
