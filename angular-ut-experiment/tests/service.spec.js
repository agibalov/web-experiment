describe('calculatorService', function() {
  var calculatorService;
  beforeEach(function() {
    var $injector = angular.injector([function($provide) {
      $provide.factory('calculatorService', function() {
        return {
          add: function(a, b) {
            return a + b;
          }
        };
      });
    }]);
    calculatorService = $injector.get('calculatorService');
  });

  it('should let me add numbers', function() {
    expect(calculatorService.add(2, 3)).toEqual(5);
  });

  it('should let me concatenate string', function() {
    expect(calculatorService.add('hello', ' world')).toEqual('hello world');
  });
});

describe('asyncCalculatorService', function() {
  var injector;
  var asyncCalculatorService;
  beforeEach(function() {
    var $injector = angular.injector(['ngMock', function($provide) {
      $provide.factory('asyncCalculatorService', function($q, $timeout) {
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
    }]);

    injector = $injector;
    asyncCalculatorService = $injector.get('asyncCalculatorService');
  });

  it('should let me add numbers', function(done) {
    var promise = asyncCalculatorService.add(2, 3);

    promise.then(function(result) {
      expect(result).toEqual(5);
      done();
    });

    var $timeout = injector.get('$timeout');
    $timeout.flush(); // ngMock's $timeout has a 'flush()' method
  });
});
