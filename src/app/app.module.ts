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
import { HttpService, applicationHttpClientCreator } from './services/http/http.service';
import { SignInComponent } from './components/authentication/sign-in/sign-in.component';
import { MyProfileComponent } from './components/user-profile/my-profile/my-profile.component';
import { ChangePasswordComponent } from './components/user-profile/change-password/change-password.component';
import { SignOutComponent } from './components/user-profile/sign-out/sign-out.component';
import { JwtTokenService } from './services/auth/jwt-token.service';
import { CookieService } from 'ngx-cookie-service';

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
    ChangePasswordComponent,
    SignInComponent,
    SignOutComponent
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
      deps: [HttpClient, JwtTokenService]
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }