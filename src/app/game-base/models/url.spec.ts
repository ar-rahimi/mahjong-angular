import {Url} from "./url";
import {User} from "./user";
import {Filter} from "./filter";

describe('Url', () => {

  it('Should return the baseUrl with the user params', () => {
    let user = new User('theUsername', 'theToken');

    let url = new Url();
    url.setBaseUrl('http://mahyong.com');
    url.withUserParams(user);

    expect(url.get()).toBe('http://mahyong.com?username=theUsername&token=theToken');
  });

  it('Should add custom params to the url', () => {
    let url = new Url();
    url.setBaseUrl('http://mahyong.com');

    url.withParams({
      'state': 'open',
      'page': '100',
      'param': 'random'
    });

    expect(url.get()).toBe('http://mahyong.com?state=open&page=100&param=random');
  });

  it('Should add the filter object to the url', () => {
    let filter = new Filter();
    filter.createdBy = 'mozdemir3@avans.nl';
    filter.state = 'open';
    filter.gameTemplate = 'shanghai';
    filter.pageSize = 25;

    let url = new Url();
    url.setBaseUrl('http://mahyong.com');
    url.withFilterParams(filter);

    expect(url.get()).toBe('http://mahyong.com?createdBy=mozdemir3@avans.nl&state=open&gameTemplate=shanghai&pageSize=25');
  });

  it('Should get the base url with the callback url', () => {

    let url = new Url('/auth/avans');
    url.withParams({
      'callbackUrl': 'http://localhost:4200/login/callback'
    });

    let expected = 'http://mahjongmayhem.herokuapp.com/auth/avans?callbackUrl=http://localhost:4200/login/callback';
    expect(url.get()).toBe(expected);
  });

});
