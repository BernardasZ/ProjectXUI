import { Component, OnInit } from '@angular/core';
import { AddTask } from 'src/app/models/task/addTask.model';
import { TasksService } from 'src/app/services/crud/tasks.service';
import { Location } from '@angular/common';
import { environment } from 'src/app/environments/environment';
import { CookieStorageService } from 'src/app/services/storage/cookie-storage.service';
import { Validator } from 'src/app/models/validation/validator.model';
import { ValidationService } from 'src/app/services/validator/validation.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {
  validators: Validator[] = [
    new Validator('title'),
    new Validator('description'),
    new Validator('status')
  ];

  addTaskRequest: AddTask = {
    userId: Number.parseInt(this.cookieStorageService.get(environment.keyUserId)),
    title: '',
    description: '',
    status: 'ToDo'
  };

  constructor(
    private tasksService: TasksService,
    private location: Location,
    private cookieStorageService: CookieStorageService,
    private validationService: ValidationService) { }

  ngOnInit() { }

  public async addTaskAsync() {
    let result = this.tasksService.getErrorResponse(await this.tasksService.addTaskAsync(this.addTaskRequest));
    if (result) {
      this.validationService.setValidator(result, this.validators);
    } else {
      this.back()
    }
  }

  public back() {
    this.location.back();
  }
}