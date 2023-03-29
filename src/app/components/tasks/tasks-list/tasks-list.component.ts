import { Component, OnInit } from '@angular/core';
import { environment } from 'src/app/environments/environment';
import { DeleteTask } from 'src/app/models/task/deleteTask.model';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/crud/tasks.service';
import { CookieStorageService } from 'src/app/services/storage/cookie-storage.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService, private cookieStorageService: CookieStorageService) {}

  async ngOnInit() {
    try {
      await this.getAllTasksAsync();
    } catch (error) {
      console.log(error);
    }
  }

  public async getAllTasksAsync() {
    let result = await this.tasksService.getAllTasksAsync();

    if (result) {
      this.tasks = result;
    }
  }

  public async deleteTaskAsync(id: number) {
    let task: DeleteTask = {
      id: id,
      userId: Number.parseInt(this.cookieStorageService.get(environment.keyUserId))
    };

    await this.tasksService.deleteTaskAsync(task);
    await this.getAllTasksAsync();
  }
}
