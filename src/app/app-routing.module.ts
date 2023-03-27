import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardComponent } from './components/dashboard/tasks-dashboard/tasks-dashboard.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { MyProfileComponent } from './components/user_profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/user_profile/change-password/change-password.component';

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
  },
  {
    path: 'users',
    component: UsersListComponent
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent
  },
  {
    path: 'profile/user/edit',
    component: MyProfileComponent
  },
  {
    path: 'profile/user/change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
