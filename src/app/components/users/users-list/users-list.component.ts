import { Component, OnInit } from '@angular/core';
import { DeleteUser } from 'src/app/models/user/deleteUser.model';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/crud/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.usersService.getAllUsers()
    .subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteUser(id: number): void {
    let user: DeleteUser = {
      id: id
    };

    this.usersService.deleteUser(user)
    .subscribe({
      next: () => {
        this.getAllUsers();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}