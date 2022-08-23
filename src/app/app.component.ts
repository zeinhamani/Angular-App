import { AuthService } from './Auth/auth.service';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';

import { Component, OnInit } from '@angular/core';

const HABITATS_URL = environment.HABITATS_URL;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'attypikHouse';
 
  constructor(private _http: HttpClient, private authService: AuthService) {
    this._http.get(HABITATS_URL).subscribe(() => {
      console.log('Http Call is success from compoennt');
    }, (error) => {
      console.log('Http Call is failed from component');
    })
  }
 

  
  
}
