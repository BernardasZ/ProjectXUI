import { Component } from '@angular/core';
import {  Router } from '@angular/router';
import { AddUser } from 'src/app/models/user/addUser.model';
import { Validator } from 'src/app/models/validation/validator.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  validators: Validator[] = [
    new Validator('name'),
    new Validator('email'),
    new Validator('password')
  ];

  addUserRequest: AddUser = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private usersService: UsersService,
    private router: Router,
    private validationService: ValidationService) { }

  public async addUserAsync() {
    let result = this.usersService.getErrorResponse(await this.usersService.addUserAsync(this.addUserRequest));
    this.validationService.setValidator(result, this.validators);

    if (!result) {
      this.cancel();
    }
  }

  public cancel() {
    this.router.navigate(['']);
  }
}