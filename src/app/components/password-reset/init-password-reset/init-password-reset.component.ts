import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InitPasswordReset } from 'src/app/models/login/initPasswordReset.model';
import { Validator } from 'src/app/models/validation/validator.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-init-password-reset',
  templateUrl: './init-password-reset.component.html',
  styleUrls: ['./init-password-reset.component.css']
})
export class InitPasswordResetComponent {
  validators: Validator[] = [
    new Validator('email')
  ];

  userInitPasswordResetRequest: InitPasswordReset = {
    email: ''
  };

  constructor(
    private loginService: LoginService,
    private validationService: ValidationService,
    private router: Router) { }

  public async submitAsync() {
     let result = this.loginService.getErrorResponse(await this.loginService.initPasswordResetAsync(this.userInitPasswordResetRequest));
     this.validationService.setValidator(result, this.validators);
     
     if (!result) {
      this.cancel();
    }
  }

  public cancel() {
    this.router.navigate(['']);
  }
}