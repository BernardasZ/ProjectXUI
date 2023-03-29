import { Injectable } from '@angular/core';
import { ErrorResponse } from 'src/app/models/exception/errorResponse.model';
import { AddTask } from 'src/app/models/task/addTask.model';
import { DeleteTask } from 'src/app/models/task/deleteTask.model';
import { Task } from 'src/app/models/task/task.model';
import { ErrorHandlerService } from '../http/error-handler.service';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(
    private http: HttpService,
    private errorHandler: ErrorHandlerService) { }

  public async getAllTasksAsync() {
    return this.genericReturn<Task[]>(
      await this.http.getAsync<Task[]>('tasks/user/1'));
  }

  public async getTaskAsync(id: number) {
    return this.genericReturn<Task>(
      await this.http.getAsync<Task>('tasks/' + id));
  }

  public async addTaskAsync(task: AddTask) {
    return await this.http.postAsync<Task>('tasks', task);
  }

  public async editTaskAsync(task: Task) {
    return await this.http.putAsync<Task>('tasks', task);
  }

  public async deleteTaskAsync(task: DeleteTask){
    return this.genericReturn<Task>(
      await this.http.deleteAsync<Task>('tasks', task));
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