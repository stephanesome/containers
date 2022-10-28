import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {TokenService} from './token.service';
import {environment} from "../../environments/environment";

const Url = environment.AUTH_Url;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private router: Router,
              private http: HttpClient,
              private tokenService: TokenService) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(Url + 'signin', {
      username,
      password
    });
  }

  logout(): void {
    this.tokenService.signOut();
  }

  getUser(): string {
    return this.tokenService.getUser();
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }

  isAdmin(): boolean {
    return this.tokenService.getRole() === 'ROLE_ADMIN';
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post(Url + 'signup', {
      username,
      password
    });
  }
}
