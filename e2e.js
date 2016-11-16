describe('dummy', function() {
  it('should work', function() {
    browser.get('http://localhost:8080/');
    expect(element(by.css('h1')).getText()).toEqual('The Angular 2 App');
  });
});
