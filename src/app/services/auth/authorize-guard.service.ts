import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { JwtTokenService } from './jwt-token.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService {

  constructor(
    private jwtService: JwtTokenService,
    private loginService: LoginService,
    private router: Router) { }
    
  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
    if (this.jwtService.isTokenNotExpired()) {
        return true;
    }
    
    let token = this.jwtService.getToken();
    if (token === null || token === '') {
      this.router.navigate(['sign-in']);
      return false;
    }

    return await this.loginService.checkSessionAsync();
  }
}