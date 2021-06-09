import {TestBed, inject} from '@angular/core/testing';

import {AuthenticationService} from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthenticationService]
    });
  });

  it('should return the logged in user', inject([AuthenticationService], (service: AuthenticationService) => {
    let username = "mozdemir3@avans.nl";
    let token = "token";

    service.login(username, token);

    expect(service.authenticatedUser().username).toEqual(username);
    expect(service.authenticatedUser().token).toEqual(token);

    service.logout();
  }));

  it('should return true if user is logged in', inject([AuthenticationService], (service: AuthenticationService) => {
    let username = "mozdemir3@avans.nl";
    let token = "token";

    service.login(username, token);

    expect(service.isLoggedIn()).toBeTruthy();

    service.logout();
  }));

  it('should return false if user is NOT logged in', inject([AuthenticationService], (service: AuthenticationService) => {
    expect(service.isLoggedIn()).toBeFalsy();
  }));

  it('should return false when a user logs out', inject([AuthenticationService], (service: AuthenticationService) => {
    let username = "mozdemir3@avans.nl";
    let token = "token";

    service.login(username, token);
    service.logout();

    expect(service.isLoggedIn()).toBeFalsy();
  }));


});
