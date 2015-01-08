angular.module('serviceApp', [])
.factory('calculatorService', function() {
  return {
    add: function(a, b) {
      return a + b;
    }
  };
});

describe('calculatorService', function() {
  beforeEach(module('serviceApp'));

  it('should let me add numbers', inject(function(calculatorService) {
    expect(calculatorService.add(2, 3)).toEqual(5);
  }));

  it('should let me concatenate string', inject(function(calculatorService) {
    expect(calculatorService.add('hello', ' world')).toEqual('hello world');
  }));
});
