import { Component } from '@angular/core';
import { environment } from './environments/environment';
import { CookieStorageService } from './services/storage/cookie-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-x-web-ui';
  userName = '';

  constructor(private cookieStorageService: CookieStorageService) {}

  ngOnInit() {
    this.userName = this.cookieStorageService.get(environment.keyUserName);

    let aa = this.userName;
  }
}