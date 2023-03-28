import { Component, OnInit } from '@angular/core';
import { EditUser } from 'src/app/models/user/editUser.model';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  user: User = {
    id: 0,
    name: '',
    email: '',
    role: ''
  };

  constructor(
    private usersService: UsersService,
    private location: Location) { }

  async ngOnInit() { 
    try {
      let result = await this.usersService.getUserAsync(1);

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

    if (result) {
      this.user = result;
    }
  }

  public back() {
    this.location.back();
  }
}