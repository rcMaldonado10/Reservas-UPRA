import { ReservasUpraPage } from './app.po';

describe('reservas-upra App', function() {
  let page: ReservasUpraPage;

  beforeEach(() => {
    page = new ReservasUpraPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
