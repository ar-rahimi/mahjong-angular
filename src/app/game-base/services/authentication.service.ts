import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map'
import {User} from "../models/user";

@Injectable()
export class AuthenticationService {

  constructor() {
  }

  login(username: string, token: string) {
    localStorage.setItem('currentUser', JSON.stringify({username: username, token: token}));
  }

  isLoggedIn(): boolean {
    let currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      return false;
    }
    return JSON.parse(currentUser).hasOwnProperty('username');
  }

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  authenticatedUser(): User {
    let currentUser = localStorage.getItem('currentUser');
    if ((JSON.parse(currentUser))) {

      let username = JSON.parse(currentUser).username;
      let token = JSON.parse(currentUser).token;

      return new User(username, token)
    }
    return new User("", "")
    // TODO: fix
  }
}
