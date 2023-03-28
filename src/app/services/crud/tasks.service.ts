import { Injectable } from '@angular/core';
import { AddTask } from 'src/app/models/task/addTask.model';
import { DeleteTask } from 'src/app/models/task/deleteTask.model';
import { Task } from 'src/app/models/task/task.model';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpService) { }

  public async getAllTasksAsync() {
    return await this.http.getAsync<Task[]>('tasks/user/1');
  }

  public async getTaskAsync(id: number) {
    return await this.http.getAsync<Task>('tasks/' + id);
  }

  public async addTaskAsync(task: AddTask) {
    return await this.http.postAsync<Task>('tasks', task);
  }

  public async editTaskAsync(task: Task) {
    return await this.http.putAsync<Task>('tasks', task);
  }

  public async deleteTaskAsync(task: DeleteTask){
    return await this.http.deleteAsync<Task>('tasks', task);
  }
}