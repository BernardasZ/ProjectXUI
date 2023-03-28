import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/crud/tasks.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTaskRequest: Task = {
    id: 0,
    userId: 1,
    title: '',
    description: '',
    status: 'ToDo'
  };

  constructor(
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.getTask(params['id']);
    });
  }

  public getTask(id: number): void  {
    this.tasksService.getTask(id)
    .subscribe({
      next: (task) => {
        this.editTaskRequest = task;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  public editTask(): void {
    this.tasksService.editTask(this.editTaskRequest)
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
