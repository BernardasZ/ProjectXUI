import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-dashboard',
  templateUrl: './tasks-dashboard.component.html',
  styleUrls: ['./tasks-dashboard.component.css']
})
export class TasksDashboardComponent implements OnInit {

  tasks: Task[] = [];

  constructor(private tasksService: TasksService, private router: Router) { }

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

  changeStatusToDone(id: number) {
    this.tasksService.getTask(id)
    .subscribe({
      next: (task) => {
        task.status = 'Done';
        this.editTask(task);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  editTask(task: Task): void {
    this.tasksService.editTask(task)
    .subscribe({
      next: () => {
        this.getAllTasks();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}