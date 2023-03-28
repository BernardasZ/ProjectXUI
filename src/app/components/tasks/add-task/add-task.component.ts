import { Component, OnInit } from '@angular/core';
import { AddTask } from 'src/app/models/task/addTask.model';
import { TasksService } from 'src/app/services/crud/tasks.service';
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

  constructor(private tasksService: TasksService, private location: Location) { }

  ngOnInit() { }

  public async addTaskAsync() {
    let result = await this.tasksService.addTaskAsync(this.addTaskRequest);

    if (result) {
      this.back();
    }
  }

  public back() {
    this.location.back();
  }
}