import { Injectable } from '@angular/core';
import { ChangePassword } from '../models/login/changePassword.model';
import { InitPasswordReset } from '../models/login/initPasswordReset.model';
import { UserLogin } from '../models/login/userLogin.model';
import { User } from '../models/user/user.model';
import { Observable } from 'rxjs';
import { UserCredentials } from '../models/login/userCredentials.model';
import { UserPasswordReset } from '../models/login/userPasswordReset.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private http: HttpService) { }

  public signIn(credentials: UserCredentials): Observable<UserLogin> {
    return this.http.post<UserLogin>('authentication/login', credentials);
  }

  public singOut(): Observable<any> {
    return this.http.delete<any>('authentication/logout');
  }

  public changePassword(changePassword: ChangePassword): Observable<User> {
    return this.http.post<User>('authentication/change-password', changePassword);
  }
  
  public initPasswordReset(initPasswordReset: InitPasswordReset): Observable<any> {
    return this.http.post('authentication/init-password-reset', initPasswordReset);
  }

  public resetPassword(userPasswordReset: UserPasswordReset): Observable<User> {
    return this.http.post<User>('authentication/reset-password', userPasswordReset);
  }
}