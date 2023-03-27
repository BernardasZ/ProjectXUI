import { Component, OnInit } from '@angular/core';
import { AddTask } from 'src/app/models/task/addTask.model';
import { TasksService } from 'src/app/services/tasks.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  addTaskRequest: AddTask = {
    userId: 1,
    title: '',
    description: '',
    status: 'ToDo'
  };

  constructor(private tasksService: TasksService, private router: Router, private location: Location) { }

  ngOnInit(): void { }

  public addTask() {
    this.tasksService.addTask(this.addTaskRequest)
    .subscribe({
      next: () => {
        this.back();
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public back(): void {
    this.location.back();
  }
}