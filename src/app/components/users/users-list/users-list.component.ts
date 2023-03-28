import { Component, OnInit } from '@angular/core';
import { DeleteUser } from 'src/app/models/user/deleteUser.model';
import { User } from 'src/app/models/user/user.model';
import { UsersService } from 'src/app/services/crud/users.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  users: User[] = [];

  constructor(private usersService: UsersService) {}

  async ngOnInit() {
    try {
      await this.getAllUsersAsync();
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllUsersAsync() {
    let result = await this.usersService.getAllUsersAsync();

    if (result) {
      this.users = result;
    }
  }

  public async deleteUserAsync(id: number) {
    let user: DeleteUser = {
      id: id
    };

    await this.usersService.deleteUserAsync(user);
    await this.getAllUsersAsync();
  }
}