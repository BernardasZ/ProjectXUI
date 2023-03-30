import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieStorageService {

  constructor(private cookieService: CookieService) { }

  public set(key: string, value: string) {
    this.cookieService.set(key, value);
  }

  public get(key: string) {
    return this.cookieService.get(key);
  }
   
  public delete(key: string) {
    this.cookieService.delete(key, '/');
  }
   
  public deleteAll() {
    this.cookieService.deleteAll('/');
  }
}