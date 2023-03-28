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
    let result = await this.tasksService.editTaskAsync(this.editTaskRequest);
    
    if (result) {
      this.back();
    }
  }

  public back() {
    this.location.back();
  }
}
