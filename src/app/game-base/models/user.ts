export class User {

  public username: string;
  public token: string;

  constructor(username, token) {
    this.username = username;
    this.token = token;
  }

  isLoggedIn() {
    return this.username && this.token
  }

}
