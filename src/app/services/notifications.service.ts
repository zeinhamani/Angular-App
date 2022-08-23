import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private NOTIF_URL = environment.NOTIF_URL
  constructor(private http: HttpClient ){}


  getNOTIFList(): Observable<any> {
   return this.http.get<any>(this.NOTIF_URL).pipe(
    tap( (response) => {
      console.table(response)
    },
    catchError(  (error ) => this.handleError(error, [])

  )));
}

addNOTIF( value: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/ld+json'})
  }
   return this.http.post(`${this.NOTIF_URL}`, value, httpOptions).pipe(
    tap( (response) => {
      this.log(response)
    },
    catchError( (error) => this.handleError(error, undefined))
   ));
}
getNOTIFItem(NOTIFId: number): Observable<any> {
   return this.http.get<any>(`${this.NOTIF_URL}/${NOTIFId}`).pipe(
    tap( (habitat) => {
      this.log(habitat)
    },
    catchError( (error) => this.handleError(error, undefined))

  ));
}

updatedNOTIF(NOTIFId: number, value: any): Observable<any> {
  const httpOptions = {
    headers: new HttpHeaders({'content-Type': 'application/ld+json'})
  }
   return this.http.put(`${this.NOTIF_URL}/${NOTIFId}`, value, httpOptions).pipe(
    tap( (response) => {
      this.log(response)
    },
    catchError( (error) => this.handleError(error, undefined))
   ));
}
 deleteNOTIF(NOTIFId: number): Observable<any>{
  return this.http.delete(`${this.NOTIF_URL}/${NOTIFId}`).pipe(
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
