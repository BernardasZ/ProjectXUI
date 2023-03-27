import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AddTask } from '../models/task/addTask.model';
import { DeleteTask } from '../models/task/deleteTask.model';
import { Task } from '../models/task/task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseApiUrl: string = environment.baseApiUrl;
  headers = {
    headers: 
    {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiQWRtaW4iLCJuYW1laWQiOiJLU0NzcUVNV1hrR0l3TmZ1N2Z4Vmw0dGhGVFlEQU9vKzFJYnN5QldHMDB3enJ0MVJwRW9adk5BclFYcnBvVXZUIiwibmJmIjoxNjc5ODU1OTY1LCJleHAiOjE2ODA0NjA3NjQsImlhdCI6MTY3OTg1NTk2NX0.oLbljOET1Hr-ApS0YuYrDU7zK7hIY4xS6yx22kBfzKo',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  };

  constructor(private http: HttpClient) { }

  public getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseApiUrl + 'tasks/user/1',  this.headers);
  }

  public getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.baseApiUrl + 'tasks/' + id, this.headers);
  }

  public addTask(task: AddTask): Observable<Task> {
    return this.http.post<Task>(this.baseApiUrl + 'tasks', task, this.headers);
  }

  public editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.baseApiUrl + 'tasks', task, this.headers);
  }

  public deleteTask(task: DeleteTask): Observable<DeleteTask> {
    let options = {
      headers: this.headers.headers,
      body: task
    };

    return this.http.delete<DeleteTask>(this.baseApiUrl + 'tasks', options);
  }
}
