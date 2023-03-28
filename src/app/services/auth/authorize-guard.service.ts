import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtTokenService } from './jwt-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuardService {

  constructor(
    private jwtService: JwtTokenService,
    private router: Router) { }
    
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | boolean {
    if (this.jwtService.getNameId()) {
        return this.jwtService.isTokenNotExpired();
    } else {
      return new Promise(() => {
        this.router.navigate(['sign-in']);
      });
    }
  }
}
