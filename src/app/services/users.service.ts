import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddUser } from '../models/user/addUser.model';
import { EditUser } from '../models/user/editUser.model';
import { DeleteUser } from '../models/user/deleteUser.model';
import { User } from '../models/user/user.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpService) { }

  public getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('users');
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>('users/' + id);
  }

  public addUser(user: AddUser): Observable<User> {
    return this.http.post<User>('users', user);
  }

  public editUser(user: EditUser): Observable<User> {
    return this.http.put<User>('users', user);
  }

  public deleteUser(user: DeleteUser): Observable<User> {
    return this.http.delete<User>('users', user);
  }
}
