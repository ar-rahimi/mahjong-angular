import {Filter} from "./filter";
import {User} from "./user";


export class Url {

  private baseUrl = 'http://136.144.128.236';
  private apiUrl = 'http://mahjongmayhem.herokuapp.com';

  constructor(url = null) {
    if (url) {
      this.concat(url);
    }
  }

  setBaseUrl(url) {
    this.apiUrl = url;
  }

  withFilterParams(filter: Filter): Url {
    this.withParams({
      "createdBy": filter.createdBy,
      "state": filter.state,
      "gameTemplate": filter.gameTemplate,
      "pageSize": filter.pageSize.toString()
    });

    return this;
  }

  withUserParams(user: User): Url {
    this.withParams({
      "username": user.username,
      "token": user.token
    });

    return this;
  }

  // JSON to query params
  withParams(params): Url {
    let param = Object.keys(params).map(function (key) {
      if (params[key]) {
        return key + '=' + params[key];
      }
    }).join('&');

    this.concatParams(param);

    return this;
  }

  withLoginCallbackUrl(): Url {
    return this.withParams({
      'callbackUrl': `${this.baseUrl}/login/callback`
    });
  }

  private concatParams(param): Url {
    // if baseUrl doesn't have a question mark --> ?
    if (this.apiUrl.indexOf('?') == -1) {
      this.concat('?');
    }

    this.concat(param);

    return this;
  }

  private concat(params): Url {
    this.apiUrl += params;

    return this;
  }

  get(): string {
    return this.apiUrl;
  }


}
