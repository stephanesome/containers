import { Component } from '@angular/core';
import {AuthenticationService} from "./authentication/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'book-store';
  get login_label(): string {
    return this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }
  constructor(private authService: AuthenticationService) {}
}
