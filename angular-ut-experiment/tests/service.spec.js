angular.module('serviceApp', [])
.factory('calculatorService', function() {
  return {
    add: function(a, b) {
      return a + b;
    }
  };
})
.factory('asyncCalculatorService', function($q, $timeout) {
  return {
    add: function(a, b) {
      var deferred = $q.defer();
      $timeout(function() {
        deferred.resolve(a + b);
      }, 1);
      return deferred.promise;
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

describe('asyncCalculatorService', function() {
  beforeEach(module('serviceApp'));

  var asyncCalculatorService;
  var $timeout;
  beforeEach(inject(function(_asyncCalculatorService_, _$timeout_) {
    asyncCalculatorService = _asyncCalculatorService_;
    $timeout = _$timeout_;
  }));

  it('should let me add numbers', function(done) {
    var promise = asyncCalculatorService.add(2, 3);

    promise.then(function(result) {
      expect(result).toEqual(5);
      done();
    });

    $timeout.flush();
  });
});
