import {Injectable} from '@angular/core';
import {Router, CanActivate} from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthenticationService) {
  }

  canActivate() {
    let currentUser = this.authService.authenticatedUser();

    if (currentUser.isLoggedIn()) {
      return true;
    }

    // not logged in so redirect to the login page
    this.router.navigate(['/login']);

    return false;
  }
}
