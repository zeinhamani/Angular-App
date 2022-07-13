import { Categorie } from './../models/categorie.model.ts';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private CAT_URL = environment.CATEGORIES_URL
     constructor(private http: HttpClient ){}


     getCatList(): Observable<any> {
      return this.http.get<any>(this.CAT_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addCat( value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.post(`${this.CAT_URL}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   getCatItem(catId: number): Observable<any> {
      return this.http.get<any>(`${this.CAT_URL}/${catId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedCat(catId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.CAT_URL}/${catId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteCat(catId: number): Observable<any>{
     return this.http.delete(`${this.CAT_URL}/${catId}`).pipe(
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
