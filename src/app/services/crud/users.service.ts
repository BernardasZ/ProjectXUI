import { Injectable } from '@angular/core';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { AddUser } from 'src/app/models/user/addUser.model';
import { DeleteUser } from 'src/app/models/user/deleteUser.model';
import { EditUser } from 'src/app/models/user/editUser.model';
import { User } from 'src/app/models/user/user.model';
import { ErrorHandlerService } from '../http/error-handler.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpService,
    private errorHandler: ErrorHandlerService) { }

  public async getAllUsersAsync() {
    return this.genericReturn<User[]>(
      await this.http.getAsync<User[]>('users'));
  }

  public async getUserAsync(id: number) {
    return this.genericReturn<User>(
      await this.http.getAsync<User>('users/' + id));
  }

  public async addUserAsync(user: AddUser) {
    return await this.http.postAsync<User>('users', user);
  }

  public async editUserAsync(user: EditUser) {
    return await this.http.putAsync<User>('users', user);
  }

  public async deleteUserAsync(user: DeleteUser) {
    return this.genericReturn<User>(
      await this.http.deleteAsync<User>('users', user));
  }

  public getErrorResponse(object: any) : ErrorResponse | null {
    if (this.errorHandler.isErrorResponse(object)) {
      return object;
    }
    
    return null;
  }

  private genericReturn<T>(object: any): T | null {
    if (!this.errorHandler.isErrorResponse(object)) {
      return object;
    }
    
    return null;
  }
}