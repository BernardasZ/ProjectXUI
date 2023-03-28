import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService {

  constructor(
    private jwtService: JwtTokenService,
    private logiService: LoginService) { }
    
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.jwtService.isTokenNotExpired()) {
        return true;
    } else {
      return this.logiService.checkSessionAsync();;
    }
  }
}