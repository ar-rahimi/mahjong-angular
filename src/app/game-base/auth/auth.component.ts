import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import {Router, ActivatedRoute} from '@angular/router';
import {Url} from "../models/url";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public authenticateUrl: String;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.authenticateUrl = new Url('/auth/avans')
      .withLoginCallbackUrl()
      .get();

    this.authenticationService.logout();

    let username = this.getQueryParam("username");
    let token = this.getQueryParam("token");

    this.authenticationService.login(username, token);

    // if params are set, user is successfully logged in
    if (username && token) {
      this.router.navigate(['/overview']);
    }

  }

  getQueryParam(name) {
    return this.route.snapshot.queryParams[name];
  }

}
