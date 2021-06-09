import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthenticationService} from "../../game-base/services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public isLoggedIn;

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isLoggedIn();
  }


}
