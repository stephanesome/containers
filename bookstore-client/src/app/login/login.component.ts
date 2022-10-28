import { Component } from '@angular/core';
import {AuthenticationService} from '../authentication/authentication.service';
import {Router} from '@angular/router';
import {TokenService} from '../authentication/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  message!: string;
  loggedIn = false;

  constructor(private router: Router,
              private loginService: AuthenticationService,
              private tokenService: TokenService) { }

  get isLoggedIn(): boolean {
    return this.loginService.isLoggedIn();
  }

  get loggedUser(): string {
    return this.loginService.getUser();
  }

  checkLogin(): void {
    this.message = '';
    this.loginService.login(this.username, this.password).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUserName(data.username);
        this.tokenService.saveUserRole(data.role);
        this.loggedIn = true;
      },
      err => {
        this.loggedIn = false;
        this.message = 'Invalid Login ' + err.error.message;
        setTimeout(() => {
          this.message = '';
        }, 3000);
      }
    );
  }

  logout(): boolean {
    this.loginService.logout();
    return true;
  }
}
