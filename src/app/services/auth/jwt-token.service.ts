import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { environment } from 'src/app/environments/environment';
import { CookieStorageService } from '../storage/cookie-storage.service';

export interface JwtPayload {
  role?: string;
  nameid?: string;
  exp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class JwtTokenService {

  jwtToken: string | null = null;
  decodedToken: JwtPayload | null = null;

  constructor(private cookieStorageService: CookieStorageService) { }

  public getToken() {
    this.decodeToken();
    return this.jwtToken;
  }

  public getNameId() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.nameid : null;
  }

  public getRole() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.role : null;
  }

  public getExpiryTime() {
    this.decodeToken();
    return this.decodedToken ? this.decodedToken.exp : null;
  }

  public isTokenNotExpired(): boolean {
    let expiryTime = this.getExpiryTime();

    if (expiryTime) {
      return (new Date()).getTime() < (expiryTime * 1000);
    } else {
      return false;
    }
  }

  private decodeToken(): void {
    let token = this.cookieStorageService.get(environment.keyJwt);

    if (token && this.jwtToken !== token) {
        this.jwtToken = token;
        this.decodedToken = jwt_decode(token);
    }
  }
}