import { MahjongPage } from './app.po';

describe('mahjong App', () => {
  let page: MahjongPage;

  beforeEach(() => {
    page = new MahjongPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
