import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditUser } from 'src/app/models/user/editUser.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  editUserRequest: EditUser = {
    id: 0,
    name: '',
    email: ''
  };

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      this.getUser(params['id']);
    }); 
  }

  public getUser(id: number) {
    this.usersService.getUser(id)
    .subscribe({
      next: (user) => {
        this.editUserRequest = user;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public editUser() {
    this.usersService.editUser(this.editUserRequest)
    .subscribe({
      next: () => {
        this.back();
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