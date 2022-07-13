import { AuthService } from './../../Auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  toggler = false;
  faMicrosoft = faMicrosoft;
  loginStatus!:  boolean
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginStatus = this.authService.isAuthenticated()
    console.log(this.loginStatus)
  }

  menuToggle() {
    this.toggler = !this.toggler;
  }
  deconnecter() {
    this.authService.logout()
    this.router.navigate(['auth/signin'])
  }
 

}
