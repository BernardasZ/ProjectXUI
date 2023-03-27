import { Component, OnInit } from '@angular/core';
import { EditUser } from 'src/app/models/user/editUser.model';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/users.service';
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

  ngOnInit(): void { 
    this.getUser(1); 
  }

  public getUser(id: number) {
    this.usersService.getUser(id)
    .subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public editUser() {
    let editUserRequest: EditUser = {
      id: this.user.id,
      name: this.user.name,
      email: this.user.email
    };
    
    this.usersService.editUser(editUserRequest)
    .subscribe({
      next: (user) => {
        this.user = user;
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