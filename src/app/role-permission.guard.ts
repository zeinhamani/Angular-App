import { AuthService } from './Auth/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolePermissionGuard implements CanActivate {
  constructor(private authService: AuthService,private router: Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthorized = this.authService.getTokenData().roles[0]=== route.data.role
    if(!isAuthorized){ 
      //redirect
      window.alert(`vous n'étes pas : ${ route.data.role } veuillez connecter`);
      this.router.navigateByUrl('auth/signin');
    }
    return isAuthorized
  }
  
}
