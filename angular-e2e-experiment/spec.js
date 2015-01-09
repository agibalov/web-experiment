describe('dummy nodejs app', function() {
  it('should have page title set to Hello e2e', function() {
    browser.get('/');
    expect(browser.getTitle()).toEqual('Hello e2e');
  });

  it('should have a welcome message', function() {
    browser.get('/');
    expect(element(by.id('message')).getText()).toEqual('hi there!');
  });

  it('should have a second welcome message', function() {
    browser.get('/');
    expect(element(by.id('asyncMessage')).getText()).toEqual('i am async message');
  });

  it('has empty A, B and result', function() {
    browser.get('/');
    expect(element(by.model('a')).getText()).toEqual('');
    expect(element(by.model('b')).getText()).toEqual('');
    expect(element(by.binding('result')).getText()).toEqual('');
  });

  it('gives me a sum of A and B when I type numbers and click submit', function() {
    browser.get('/');

    element(by.model('a')).sendKeys(2);
    element(by.model('b')).sendKeys(3);
    element(by.id('addNumbers')).click();    
    expect(element(by.binding('result')).getText()).toEqual('5');

    expect(element(by.model('a')).getText()).toEqual('');
    expect(element(by.model('b')).getText()).toEqual('');
  });
});
