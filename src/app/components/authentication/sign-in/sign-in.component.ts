import { Component } from '@angular/core';
import { UserCredentials } from 'src/app/models/login/userCredentials.model';
import { Validator } from 'src/app/models/validation/validator.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  validators: Validator[] = [
    new Validator('email'),
    new Validator('password')
  ];

  userCredentials: UserCredentials = {
    email: '',
    password: ''
  };

  constructor(private loginService: LoginService, private validationService: ValidationService) { }

  public async signInAsync() {
    let result = await this.loginService.signInAsync(this.userCredentials);
    this.validationService
      .setValidator(this.loginService.getErrorResponse(result), this.validators);
  }
}