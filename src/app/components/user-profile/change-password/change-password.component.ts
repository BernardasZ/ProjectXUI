import { Component, OnInit } from '@angular/core';
import { ChangePassword } from 'src/app/models/login/changePassword.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { Location } from '@angular/common';
import { ValidationService } from 'src/app/services/validator/validation.service';
import { Validator } from 'src/app/models/validation/validator.model';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  validators: Validator[] = [
    new Validator('email'),
    new Validator('oldPassword'),
    new Validator('newPassword')
  ];

  changePasswordCredentials: ChangePassword = {
    email: '',
    newPassword: '',
    oldPassword: ''
  };

  constructor(
    private loginService: LoginService,
    private location: Location,
    private validationService: ValidationService) { }

  ngOnInit() { }

  public async submitAsync() {
    let result = this.loginService.getErrorResponse(await this.loginService.changePasswordAsync(this.changePasswordCredentials));

    if (result) {
      this.validationService.setValidator(result, this.validators);
    }
  }

  public back() {
    this.location.back();
  }
}