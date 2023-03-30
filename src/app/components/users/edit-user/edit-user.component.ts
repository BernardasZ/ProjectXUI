import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EditUser } from 'src/app/models/user/editUser.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { Location } from '@angular/common';
import { Validator } from 'src/app/models/validation/validator.model';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  validators: Validator[] = [
    new Validator('name'),
    new Validator('email')
  ];

  editUserRequest: EditUser = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location,
    private validationService: ValidationService) { }

  async ngOnInit() { 
    try {
      this.route.params.subscribe(async params => {
        await this.getUserAsync(params['id']);
      }); 
    } catch (error) {
      console.log(error);
    }
  }

  public async getUserAsync(id: number) {
    let result = await this.usersService.getUserAsync(id);

    if (result) {
      this.editUserRequest = result;
    }
  }

  public async editUserAsync() {
    let result = this.usersService.getErrorResponse(await this.usersService.editUserAsync(this.editUserRequest));

    if (result) {
      this.validationService.setValidator(result, this.validators);
    } else {
      this.back();
    }
  }

  public back() {
    this.location.back();
  }
}