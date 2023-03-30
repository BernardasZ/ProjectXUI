import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/app/environments/environment';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { ChangePassword } from 'src/app/models/login/changePassword.model';
import { InitPasswordReset } from 'src/app/models/login/initPasswordReset.model';
import { UserCredentials } from 'src/app/models/login/userCredentials.model';
import { UserLogin } from 'src/app/models/login/userLogin.model';
import { UserPasswordReset } from 'src/app/models/login/userPasswordReset.model';
import { User } from 'src/app/models/user/user.model';
import { ErrorHandlerService } from '../http/error-handler.service';
import { HttpService } from '../http/http.service';
import { CookieStorageService } from '../storage/cookie-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(
    private http: HttpService,
    private cookieStorageService: CookieStorageService,
    private router: Router,
    private errorHandler: ErrorHandlerService) { }

  public async signInAsync(credentials: UserCredentials) {
    let result = await this.http.postAsync<UserLogin>('authentication/login', credentials);

    if (this.errorHandler.isErrorResponse(result)) {
      return result; 
    }

    let user = this.genericReturn<UserLogin>(result);

    if (user) {
      this.cookieStorageService.deleteAll();
      this.cookieStorageService.set(environment.keyJwt, user.jwt);
      this.cookieStorageService.set(environment.keyUserId, user.id.toString());
      this.cookieStorageService.set(environment.keyUserName, user.name);
      this.cookieStorageService.set(environment.keyRole, user.role);
      this.router.navigate(['']);
    }

    return user;
  }

  public async singOutAsync() {
    let result = await this.http.deleteAsync<any>('authentication/logout');

    if (!this.errorHandler.isErrorResponse(result)) {
      this.finishSignOut();
    }
  }

  public async changePasswordAsync(changePassword: ChangePassword) {
    let result = await this.http.postAsync<User>('authentication/change-password', changePassword);

    if (!this.errorHandler.isErrorResponse(result)) {
      await this.singOutAsync();
    }

    return result
  }
  
  public async initPasswordResetAsync(initPasswordReset: InitPasswordReset) {
    return await this.http.postAsync('authentication/init-password-reset', initPasswordReset);
  }

  public async resetPasswordAsync(userPasswordReset: UserPasswordReset) {
    return await this.http.postAsync<User>('authentication/reset-password', userPasswordReset);
  }

  public async checkSessionAsync() {
    let result = await this.http.getAsync<any>('authentication/check-session');

    if (this.errorHandler.isErrorResponse(result)) {
      this.finishSignOut();
    }
  }

  public getErrorResponse(object: any) : ErrorResponse | null {
    if (this.errorHandler.isErrorResponse(object)) {
      return object;
    }
    
    return null;
  }

  private finishSignOut() {
    this.cookieStorageService.deleteAll();
    this.router.navigate(['sign-in']);
  }

  private genericReturn<T>(object: any): T | null {
    if (!this.errorHandler.isErrorResponse(object)) {
      return object;
    }
    
    return null;
  }
}