import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/crud/tasks.service';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css']
})
export class TasksDashboardComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) { }

  async ngOnInit() {
    try {           
      await this.getAllTasksAsync();
    } catch (error) {           
        console.error(error);       
    }
  }

  public async getAllTasksAsync() {
    let result = await this.tasksService.getAllTasksAsync();

    if (result) {
      this.tasks = result;
    }  
  }

  public async changeStatusToDone(id: number) {
    let result = await this.tasksService.getTaskAsync(id);

    if (result) {
      result.status = 'Done';
      await this.tasksService.editTaskAsync(result);
      await this.getAllTasksAsync();
    }
  }
}