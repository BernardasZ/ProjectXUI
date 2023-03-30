import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserPasswordReset } from 'src/app/models/login/userPasswordReset.model';
import { Validator } from 'src/app/models/validation/validator.model';
import { LoginService } from 'src/app/services/auth/login.service';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {
  validators: Validator[] = [
    new Validator('newPassword')
  ];

  userPasswordResetRequest: UserPasswordReset = {
    token: '',
    newPassword: '',
  };

  constructor(
    private loginService: LoginService,
    private route: ActivatedRoute,
    private validationService: ValidationService,
    private router: Router) { }

    async ngOnInit() { 
      try {
        this.route.queryParams.subscribe(async params => {
          this.userPasswordResetRequest.token = params['token'];
        });
      } catch (error) {
        console.log(error);
      }
    }

  public async submitAsync() {
     let result = this.loginService.getErrorResponse(await this.loginService.resetPasswordAsync(this.userPasswordResetRequest));
      this.validationService.setValidator(result, this.validators);

    if (!result) {
      this.cancel();
    }
  }

  public cancel() {
    this.router.navigate(['']);
  }
}