import { ReservasUPRAPage } from './app.po';

describe('reservas-upra App', function() {
  let page: ReservasUPRAPage;

  beforeEach(() => {
    page = new ReservasUPRAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
