import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasksDashboardComponent } from './components/dashboard/tasks-dashboard/tasks-dashboard.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { AuthorizeGuardService } from './services/auth/authorize-guard.service';
import { MyProfileComponent } from './components/user-profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { SignOutComponent } from './components/user-profile/sign-out/sign-out.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: '',
    component: TasksDashboardComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'tasks',
    component: TasksListComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'tasks/add',
    component: AddTaskComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'tasks/edit/:id',
    component: EditTaskComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'users',
    component: UsersListComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'users/edit/:id',
    component: EditUserComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'profile/user/edit',
    component: MyProfileComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'profile/user/change-password',
    component: ChangePasswordComponent,
    canActivate: [AuthorizeGuardService]
  },
  {
    path: 'sign-out',
    component: SignOutComponent,
    canActivate: [AuthorizeGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
