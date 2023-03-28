import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

  public async signInAsync(credentials: UserCredentials) {
    let user = await this.http.postAsync<UserLogin>('authentication/login', credentials);
    if (user)
    {
        this.storageService.set(environment.keyJwt, user.jwt);
        this.storageService.set(environment.keyUserId, user.id.toString());
        this.storageService.set(environment.keyRole, user.role);
        this.router.navigate(['']);
    }
  }

  public async singOutAsync() {
    await this.http.deleteAsync<any>('authentication/logout');
    this.finishSignOut();
  }

  public async changePasswordAsync(changePassword: ChangePassword) {
    await this.http.postAsync<User>('authentication/change-password', changePassword);
    await this.singOutAsync();
  }
  
  public async initPasswordResetAsync(initPasswordReset: InitPasswordReset) {
    await this.http.postAsync('authentication/init-password-reset', initPasswordReset);
  }

  public async resetPasswordAsync(userPasswordReset: UserPasswordReset) {
    await this.http.postAsync<User>('authentication/reset-password', userPasswordReset);
  }

  public async checkSessionAsync() {
    await this.http.getAsync<any>('authentication/check-session');
    this.finishSignOut();
  }

  private finishSignOut(): void {
    this.storageService.clear();
    this.router.navigate(['sign-in']);
  }
}