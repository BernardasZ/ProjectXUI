import { Component, OnInit } from '@angular/core';
import { DeleteTask } from 'src/app/models/task/deleteTask.model';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/crud/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

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
      userId: 1
    };

    await this.tasksService.deleteTaskAsync(task);
    await this.getAllTasksAsync();
  }
}
