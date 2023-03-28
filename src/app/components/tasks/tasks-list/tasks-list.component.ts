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

  ngOnInit(): void {
    this.getAllTasks();
  }

  getAllTasks() {
    this.tasksService.getAllTasks()
    .subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  deleteTask(id: number) {
    let task: DeleteTask = {
      id: id,
      userId: 1
    };

    this.tasksService.deleteTask(task)
    .subscribe({
      next: () => {
        this.getAllTasks();
      },
      error: (response) => {
        console.log(response);
      }
    })
  }
}
