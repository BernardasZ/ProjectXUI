import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardComponent } from './components/dashboard/tasks-dashboard/tasks-dashboard.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';

const routes: Routes = [
  {
    path: '',
    component: TasksDashboardComponent
  },
  {
    path: 'tasks',
    component: TasksListComponent
  },
  {
    path: 'tasks/add',
    component: AddTaskComponent
  },
  {
    path: 'tasks/edit/:id',
    component: EditTaskComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
