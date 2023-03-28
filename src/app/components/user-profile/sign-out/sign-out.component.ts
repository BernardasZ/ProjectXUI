import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.css']
})
export class SignOutComponent {

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.loginService.singOut();
  }
}