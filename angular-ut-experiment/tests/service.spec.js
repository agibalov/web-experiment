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

describe('dataAccessService', function() {
  var dataAccessService;
  var $httpBackend;
  beforeEach(function() {
    var $injector = angular.injector(['ngMock', function($provide) {
      $provide.factory('dataAccessService', function($http) {
        return {
          getData: function() {
            return $http.get('/');
          },
          sendData: function(a, b) {
            return $http.post('/', { a: a, b: b });
          }
        };
      });
    }]);
    
    $httpBackend = $injector.get('$httpBackend');
    dataAccessService = $injector.get('dataAccessService');
  });


  it('can get data successfully', function(done) {    
    $httpBackend.whenGET('/').respond(200, { message: 'hello' });
    
    dataAccessService.getData().then(function(response) {
      expect(response.status).toBe(200);
      expect(response.data.message).toBe('hello');
      done();
    });

    $httpBackend.flush();
  });  

  it('can get data with error', function(done) {
    $httpBackend.whenGET('/').respond(400, { message: 'hello bad request' });

    dataAccessService.getData().error(function(data, status) {
      expect(status).toBe(400);
      expect(data.message).toBe('hello bad request');
      done();
    });

    $httpBackend.flush();
  });  

  it('can send data', function(done) {
    $httpBackend.whenPOST('/').respond(function(method, url, data, headers) {
      var dataObj = JSON.parse(data);
      return [201, JSON.stringify({
        a: dataObj.a, 
        b: dataObj.b, 
        result: parseInt(dataObj.a) + parseInt(dataObj.b) 
      })];
    });

    dataAccessService.sendData(2, 3).then(function(response) {
      expect(response.status).toBe(201);
      expect(response.data.a).toBe(2);
      expect(response.data.b).toBe(3);
      expect(response.data.result).toBe(5);
      done();
    });

    $httpBackend.flush();
  });
});
