import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/crud/tasks.service';
import { Location } from '@angular/common';
import { ValidationService } from 'src/app/services/validator/validation.service';
import { Validator } from 'src/app/models/validation/validator.model';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  validators: Validator[] = [
    new Validator('title'),
    new Validator('description'),
    new Validator('status')
  ];
  
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
    private location: Location,
    private validationService: ValidationService) { }

  async ngOnInit() {
    try {
      this.route.params.subscribe(async params => {
        await this.getTaskAsync(params['id']);
      });
    } catch (error) {
      console.log(error);
    }
  }

  public async getTaskAsync(id: number)  {
    let result = await this.tasksService.getTaskAsync(id);

    if (result) {
      this.editTaskRequest = result;
    }
  }

  public async editTaskAsync() {
    let result = this.tasksService.getErrorResponse(await this.tasksService.editTaskAsync(this.editTaskRequest));
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
