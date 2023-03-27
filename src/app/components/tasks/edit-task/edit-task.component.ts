import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/models/task/task.model';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTaskRequest: Task = {
    id: 0,
    userId: 1,
    name: '',
    status: 'ToDo'
  };

  constructor(private tasksService: TasksService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { 
    this.route.params.subscribe(params => {
      this.getTask(params['id']);
    }); 
  }

  public getTask(id: number) {
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

  public editTask() {
    this.tasksService.editTask(this.editTaskRequest)
    .subscribe({
      next: () => {
        this.router.navigate(['/tasks']);
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
