import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddTask } from '../models/task/addTask.model';
import { DeleteTask } from '../models/task/deleteTask.model';
import { Task } from '../models/task/task.model';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpService) { }

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>('tasks/user/1');
  }

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>('tasks/' + id);
  }

  public addTask(task: AddTask): Observable<Task> {
    return this.http.post<Task>('tasks', task);
  }

  public editTask(task: Task): Observable<Task> {
    return this.http.put<Task>('tasks', task);
  }

  public deleteTask(task: DeleteTask): Observable<Task> {
    return this.http.delete<Task>('tasks', task);
  }
}