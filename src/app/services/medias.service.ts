import { Media } from './../models/media.model.ts';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MediasService {
 
  private MEDIA_URL = environment.MEDIAS_URL
     constructor(private http: HttpClient ){}


     getMediaList(): Observable<any> {
      return this.http.get<any>(this.MEDIA_URL).pipe(
       tap( (response) => {
         console.table(response)
       },
       catchError(  (error ) => this.handleError(error, [])
 
     )));
   }
 
   addMedia(file: File,categorie: number = 0, habitat: number = 0,user: number = 0,equipement:number = 0 ): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'multipart/form-data; boundary=<calculated when request is sent>'})
     }
     const fd: FormData = new FormData()
     fd.set('file',file)
     fd.set('user',user.toString())
     fd.set('habitat',habitat.toString())
     fd.set('categorie',categorie.toString())
     fd.set('equipement',equipement.toString())
      return this.http.post(`${this.MEDIA_URL}`, fd).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
   
   getMediaItem(MediaId: number): Observable<any> {
      return this.http.get<any>(`${this.MEDIA_URL}/${MediaId}`).pipe(
       tap( (habitat) => {
         this.log(habitat)
       },
       catchError( (error) => this.handleError(error, undefined))
 
     ));
   }
 
   updatedMedia(MediaId: number, value: any): Observable<any> {
     const httpOptions = {
       headers: new HttpHeaders({'content-Type': 'application/ld+json'})
     }
      return this.http.put(`${this.MEDIA_URL}/${MediaId}`, value, httpOptions).pipe(
       tap( (response) => {
         this.log(response)
       },
       catchError( (error) => this.handleError(error, undefined))
      ));
   }
    deleteMedia(MediaId: number): Observable<any>{
     return this.http.delete(`${this.MEDIA_URL}/${MediaId}`).pipe(
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



