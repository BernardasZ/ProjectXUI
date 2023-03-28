import { Injectable } from '@angular/core';
import { AddUser } from 'src/app/models/user/addUser.model';
import { DeleteUser } from 'src/app/models/user/deleteUser.model';
import { EditUser } from 'src/app/models/user/editUser.model';
import { User } from 'src/app/models/user/user.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) { }

  public async getAllUsersAsync() {
    return await this.http.getAsync<User[]>('users');
  }

  public async getUserAsync(id: number) {
    return await this.http.getAsync<User>('users/' + id);
  }

  public async addUserAsync(user: AddUser) {
    return await this.http.postAsync<User>('users', user);
  }

  public async editUserAsync(user: EditUser) {
    return await this.http.putAsync<User>('users', user);
  }

  public async deleteUserAsync(user: DeleteUser) {
    return await this.http.deleteAsync<User>('users', user);
  }
}