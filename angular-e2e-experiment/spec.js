describe('dummy nodejs app', function() {
  it('should have page title set to Hello e2e', function() {
    browser.get('http://localhost:1337/');
    expect(browser.getTitle()).toEqual('Hello e2e');
  });

  it('should have a welcome message', function() {
    browser.get('http://localhost:1337/');
    expect(element(by.id('message')).getText()).toEqual('hi there!');
  });

  it('should have a second welcome message', function() {
    browser.get('http://localhost:1337/');
    expect(element(by.id('asyncMessage')).getText()).toEqual('i am async message');
  });
});
