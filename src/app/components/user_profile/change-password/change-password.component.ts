import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/models/login/changePassword.model';
import { LoginService } from 'src/app/services/login.service';
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
    this.changePassword(this.changePasswordCredentials);
  }

  public changePassword(changePassword: ChangePassword) {
    this.loginService.changePassword(changePassword)
    .subscribe({
      next: () => {
        this.singOut();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public singOut() {
    this.loginService.singOut()
    .subscribe({
      next: () => {
        //TODO: Delete session;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public back(): void {
    this.location.back();
  }
}