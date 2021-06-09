import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Url} from "../models/url";
import {Observable} from "rxjs/Observable";

@Injectable()
export class TemplateService {

  constructor(public http: Http,) {
  }


  getTemplates(): Observable<any> {
    let url = new Url('/gameTemplates').get();
    return this.http.get(url).map(this.returnTemplates);
  }

  private returnTemplates(res) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    return res.json() || {};
  }
}
