import { User } from './../models/user.model.ts';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Credentials } from './cridentials';
import { map } from 'rxjs/operators';
import { UsersService } from '../services/users.service';

// ADRESSE URL
const USERS_URL = environment.USERS_URL;
const AUTH_URL = environment.AUTH_URL


interface AuthResponse {
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authState = new Subject<boolean>();
  constructor(private userService: UsersService, private http: HttpClient, private storage: Storage) {}
  
  
  register(account: User) {
    return this.http.post(AUTH_URL, account);
  }

  login(credentials: Credentials) {
    return this.http.post(AUTH_URL, credentials).pipe(
      map((resultat: AuthResponse|any) => {
        this.storage.setItem('token', resultat.token);
        this.authState.next(true);
        return resultat;
      }))
  }

 
  logout() {
    this.storage.removeItem('token');
    this.authState.next(false);
  }

  getToken(): string | null{
    return this.storage.getItem('token') || null;
  }
  isAuthenticated(): boolean {
    return this.getToken() !== null;
    
  }
  getTokenData(): any {
    if (!this.getToken()) { return null; }
    return jwtDecode(this.getToken()!) ;
  }    
}


