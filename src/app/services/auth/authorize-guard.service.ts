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
    private loginService: LoginService) { }
    
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if (this.jwtService.isTokenNotExpired()) {
        return true;
    } else {
      return await this.loginService.checkSessionAsync();
    }
  }
}