import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MediasService } from './medias.service';
import { User } from './../models/user.model.ts';
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NavigationCancel, ResolveEnd, ResolveStart, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

 
private USERS_URL = environment.USERS_URL
     constructor(private http: HttpClient ){}


     getUserList(): Observable<any> {
      return this.http.get<any>(this.USERS_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addUser( value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.post(`${this.USERS_URL}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   getUserItem(userId: number): Observable<any> {
      return this.http.get<any>(`${this.USERS_URL}/${userId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedUser(userId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.USERS_URL}/${userId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteUser(userId: number): Observable<any>{
     return this.http.delete(`${this.USERS_URL}/${userId}`).pipe(
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
  
  /*loadingState = new Subject<boolean>()
  
  constructor(private router: Router, private media: MediasService) {
    this.initializeRouterEvents();
  }
  public activateLoading() {
    this.loadingState.next(true);
  }
  public deactivateLoading() {
    this.loadingState.next(false);
  }
  private initializeRouterEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        this.loadingState.next(true);
      } else if (event instanceof ResolveEnd || event instanceof NavigationCancel) {
        this.loadingState.next(false);
      }
    });
  }*/
}
