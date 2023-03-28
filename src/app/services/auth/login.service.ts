import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/app/environments/environment';
import { ChangePassword } from 'src/app/models/login/changePassword.model';
import { InitPasswordReset } from 'src/app/models/login/initPasswordReset.model';
import { UserCredentials } from 'src/app/models/login/userCredentials.model';
import { UserLogin } from 'src/app/models/login/userLogin.model';
import { UserPasswordReset } from 'src/app/models/login/userPasswordReset.model';
import { User } from 'src/app/models/user/user.model';
import { HttpService } from '../http/http.service';
import { LocalStorageService } from '../storage/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(
    private http: HttpService,
    private storageService: LocalStorageService,
    private router: Router) { }

  public signIn(credentials: UserCredentials): void {
    this.http.post<UserLogin>('authentication/login', credentials)
    .subscribe({
      next: (user) => {
        this.storageService.set(environment.keyJwt, user.jwt);
        this.storageService.set(environment.keyUserId, user.id.toString());
        this.storageService.set(environment.keyRole, user.role);
        this.router.navigate(['']);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public singOut(): void {
    this.http.delete<any>('authentication/logout')
    .subscribe({
      next: () => {
        this.storageService.clear();
        this.router.navigate(['sign-in']);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public changePassword(changePassword: ChangePassword): void {
    this.http.post<User>('authentication/change-password', changePassword)
    .subscribe({
      next: () => {
        this.singOut();
      },
      error: (response) => {
        console.log(response);
      }
    });;
  }
  
  public initPasswordReset(initPasswordReset: InitPasswordReset): Observable<any> {
    return this.http.post('authentication/init-password-reset', initPasswordReset);
  }

  public resetPassword(userPasswordReset: UserPasswordReset): Observable<User> {
    return this.http.post<User>('authentication/reset-password', userPasswordReset);
  }
}