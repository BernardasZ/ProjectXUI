import { Component } from '@angular/core';
import { UserCredentials } from 'src/app/models/login/userCredentials.model';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  userCredentials: UserCredentials = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService) {}

  public async signInAsync() {
    await this.loginService.signInAsync(this.userCredentials);
  }
}