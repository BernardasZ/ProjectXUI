import { Component, OnInit } from '@angular/core';
import { EditUser } from 'src/app/models/user/editUser.model';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { Location } from '@angular/common';
import { CookieStorageService } from 'src/app/services/storage/cookie-storage.service';
import { environment } from 'src/app/environments/environment';
import { ValidationService } from 'src/app/services/validator/validation.service';
import { Validator } from 'src/app/models/validation/validator.model';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  validators: Validator[] = [
    new Validator('id'),
    new Validator('name'),
    new Validator('email'),
    new Validator('role')
  ];

  user: User = {
    id: Number.parseInt(this.cookieStorageService.get(environment.keyUserId)),
    name: '',
    email: '',
    role: ''
  };

  constructor(
    private usersService: UsersService,
    private location: Location,
    private cookieStorageService: CookieStorageService,
    private validationService: ValidationService) { }

  async ngOnInit() { 
    try {
      let result = await this.usersService.getUserAsync(this.user.id);

      if (result) {
        this.user = result;
      }
    } catch (error) {
      console.log(error);
    }
  }

  public async editUserAsync() {
    let editUserRequest: EditUser = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email
    };

    let result = await this.usersService.editUserAsync(editUserRequest);
    let error = this.usersService.getErrorResponse(result)

    this.validationService.setValidator(error, this.validators);

    if (!error && result) {
      this.user = result;
    }
  }

  public back() {
    this.location.back();
  }
}