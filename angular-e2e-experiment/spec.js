describe('angularjs homepage', function() {
  it('should have a title', function() {
    browser.get('http://juliemr.github.io/protractor-demo/');

    expect(browser.getTitle()).toEqual('Super Calculator');

    browser.getTitle().then(function(x) {
      console.log(x);
    });
  });
});
