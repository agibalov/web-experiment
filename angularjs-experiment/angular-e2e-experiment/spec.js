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

  describe('calculator via locators', function() {
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

  describe('calculator via page object', function() {
    it('has empty A, B and result', function() {
      var page = new CalculatorPage();
      page.get();
      expect(page.getA()).toEqual('');
      expect(page.getB()).toEqual('');
      expect(page.getResult()).toEqual('');
    });

    it('gives me a sum of A and B when I type numbers and click submit', function() {
      var page = new CalculatorPage();
      page.get();

      page.setA(2);
      page.setB(3);
      page.triggerAdd();
      expect(page.getResult()).toEqual('5');
      expect(page.getA()).toEqual('');
      expect(page.getB()).toEqual('');
    });

    function CalculatorPage() {
      this.aInput = element(by.model('a'));
      this.bInput = element(by.model('b'));
      this.result = element(by.binding('result'));
      this.add = element(by.id('addNumbers'));

      this.get = function() {
        browser.get('/');
      };

      this.setA = function(a) {
        this.aInput.sendKeys(a);
      };

      this.getA = function() {
        return this.aInput.getText();
      };

      this.setB = function(b) {
        this.bInput.sendKeys(b);
      };

      this.getB = function() {
        return this.bInput.getText();
      };

      this.triggerAdd = function() {
        this.add.click();
      };

      this.getResult = function() {
        return this.result.getText();
      };
    };
  });  
});
