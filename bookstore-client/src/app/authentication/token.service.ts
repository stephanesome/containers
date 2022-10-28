import { Injectable } from '@angular/core';

export const TOKEN = 'token';
export const USER_NAME = 'username';
export const USER_ROLE = 'role';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN);
    window.sessionStorage.setItem(TOKEN, token);
  }

  public getToken(): string {
    return <string>sessionStorage.getItem(TOKEN);
  }

  public saveUserName(username: string): void {
    window.sessionStorage.removeItem(USER_NAME);
    window.sessionStorage.setItem(USER_NAME, username);
  }

  public saveUserRole(role: string): void {
    window.sessionStorage.removeItem(USER_ROLE);
    window.sessionStorage.setItem(USER_ROLE, role);
  }

  public getUser(): string {
    return <string>sessionStorage.getItem(USER_NAME);
  }

  public getRole(): string {
    return <string>sessionStorage.getItem(USER_ROLE);
  }
}
