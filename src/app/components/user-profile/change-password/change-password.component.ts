import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/models/login/changePassword.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  changePasswordCredentials: ChangePassword = {
    email: '',
    newPassword: '',
    oldPassword: ''
  };

  constructor(
    private loginService: LoginService,
    private location: Location) { }

  ngOnInit(): void { }

  public submit(): void {
    this.loginService.changePassword(this.changePasswordCredentials);
  }

  public back(): void {
    this.location.back();
  }
}