import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';

import { TasksListComponent } from './components/tasks/tasks-list/tasks-list.component';
import { AddTaskComponent } from './components/tasks/add-task/add-task.component';
import { EditTaskComponent } from './components/tasks/edit-task/edit-task.component';
import { TasksDashboardComponent } from './components/dashboard/tasks-dashboard/tasks-dashboard.component';
import { UsersListComponent } from './components/users/users-list/users-list.component';
import { EditUserComponent } from './components/users/edit-user/edit-user.component';
import { MyProfileComponent } from './components/user_profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/user_profile/change-password/change-password.component';
import { HttpService, applicationHttpClientCreator } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    TasksListComponent,
    AddTaskComponent,
    EditTaskComponent,
    TasksDashboardComponent,
    UsersListComponent,
    EditUserComponent,
    MyProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: applicationHttpClientCreator,
      deps: [HttpClient]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }