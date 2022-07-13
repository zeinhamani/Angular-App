import { Injectable } from '@angular/core';
import { ServiceHabitat } from '../models/service-habitat.model.ts';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitatServicesService {
  private SERV_URL = environment.SERVICES_URL
  constructor(private http: HttpClient ){}


  getServList(): Observable<any> {
   return this.http.get<any>(this.SERV_URL).pipe(
    tap( (response) => {
      console.table(response)
    },
    catchError(  (error ) => this.handleError(error, [])

  )));
}

addServ( value: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/ld+json'})
  }
   return this.http.post(`${this.SERV_URL}`, value, httpOptions).pipe(
    tap( (response) => {
      this.log(response)
    },
    catchError( (error) => this.handleError(error, undefined))
   ));
}
getServItem(ServId: number): Observable<any> {
   return this.http.get<any>(`${this.SERV_URL}/${ServId}`).pipe(
    tap( (habitat) => {
      this.log(habitat)
    },
    catchError( (error) => this.handleError(error, undefined))

  ));
}

updatedServ(ServId: number, value: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/ld+json'})
  }
   return this.http.put(`${this.SERV_URL}/${ServId}`, value, httpOptions).pipe(
    tap( (response) => {
      this.log(response)
    },
    catchError( (error) => this.handleError(error, undefined))
   ));
}
 deleteServ(ServId: number): Observable<any>{
  return this.http.delete(`${this.SERV_URL}/${ServId}`).pipe(
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
