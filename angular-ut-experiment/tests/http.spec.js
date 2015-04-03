describe('$http', function() {
  it('should provide successful result when there was no error (<300)', inject(function($httpBackend, $http) {
    $httpBackend.expect('GET', '/something').respond(200, { here: 'it is' });

    var onSuccess = jasmine.createSpy('onSuccess');
    var onError = jasmine.createSpy('onError');

    $http.get('/something').then(onSuccess, onError);

    $httpBackend.verifyNoOutstandingExpectation();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();

    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();

    expect(onSuccess.calls.count()).toBe(1);
    expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 200,
      data: {
        here: 'it is'
      }
    }));

    expect(onError).not.toHaveBeenCalled();
  }));

  it('should provide error result when there was an error (>=400)', inject(function($httpBackend, $http) {
    $httpBackend.expect('GET', '/something').respond(400, { here: 'it is' });

    var onSuccess = jasmine.createSpy('onSuccess');
    var onError = jasmine.createSpy('onError');

    $http.get('/something').then(onSuccess, onError);

    $httpBackend.verifyNoOutstandingExpectation();

    expect(onSuccess).not.toHaveBeenCalled();
    expect(onError).not.toHaveBeenCalled();

    $httpBackend.flush();
    $httpBackend.verifyNoOutstandingRequest();

    expect(onError.calls.count()).toBe(1);
    expect(onError).toHaveBeenCalledWith(jasmine.objectContaining({
      status: 400,
      data: {
        here: 'it is'
      }
    }));

    expect(onSuccess).not.toHaveBeenCalled();
  }));

  describe('Response handler', function() {
    var interpretResponse;

    beforeEach(inject(function($q) {
      interpretResponse = new ResponseHandler()
        .when(200, returnData())
        .when(400, throwValidationError($q))
        .otherwise(throwError($q))
        .wrap;
    }));

    it('should successfully resolve to data when 200', inject(function($httpBackend, $http) {
      $httpBackend.expect('GET', '/something').respond(200, { here: 'it is' });

      var onSuccess = jasmine.createSpy('onSuccess');
      interpretResponse($http.get('/something'))
        .then(onSuccess);

      $httpBackend.verifyNoOutstandingExpectation();

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();

      expect(onSuccess).toHaveBeenCalledWith(jasmine.objectContaining({
        here: 'it is'
      }));
    }));

    it('should reject with validation error when 400', inject(function($httpBackend, $http) {
      $httpBackend.expect('GET', '/something').respond(400, { here: 'it is' });

      var onError = jasmine.createSpy('onError');
      interpretResponse($http.get('/something'))
        .then(null, onError);

      $httpBackend.verifyNoOutstandingExpectation();

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();

      expect(onError).toHaveBeenCalledWith(jasmine.objectContaining({
        message: 'validation'
      }));
    }));

    it('should reject with error when not 200 and not 400', inject(function($httpBackend, $http) {
      $httpBackend.expect('GET', '/something').respond(500, { here: 'it is' });

      var onError = jasmine.createSpy('onError');
      interpretResponse($http.get('/something'))
        .then(null, onError);

      $httpBackend.verifyNoOutstandingExpectation();

      $httpBackend.flush();
      $httpBackend.verifyNoOutstandingRequest();

      expect(onError).toHaveBeenCalledWith(jasmine.objectContaining({
        message: '500'
      }));
    }));

    function returnData() {
      return function(httpResponse) {
        return httpResponse.data;
      };
    };

    function throwValidationError($q) {
      return function(httpResponse) {
        return $q.reject(new Error('validation'));
      };
    };

    function throwError($q) {
      return function(httpResponse) {
        return $q.reject(new Error(httpResponse.status));
      };
    };

    function ResponseHandler() {
      var self = this;
      self.handlers = {};
      self.otherwiseHandlerFunc = null;

      self.when = function(statusCode, handlerFunc) {
        self.handlers[statusCode] = handlerFunc;
        return self;
      };

      self.otherwise = function(handlerFunc) {
        self.otherwiseHandlerFunc = handlerFunc;
        return self;
      };

      self.handle = function(httpResponse) {
        var statusCode = httpResponse.status;
        var handlerFunc = self.handlers[statusCode];
        if(!handlerFunc) {
          handlerFunc = self.otherwiseHandlerFunc;
        }

        return handlerFunc(httpResponse);
      };

      self.wrap = function(promise) {
        return promise.then(self.handle, self.handle);
      };
    };
  });

  describe('Interceptor', function() {
    var interceptor;
    beforeEach(module(function($httpProvider) {
      $httpProvider.interceptors.push(function() {
        interceptor = {
          request: function(config) {
            console.log('request', config);
            return config;
          },
          requestError: function(rejection) {
            console.log('requestError', rejection);
            return rejection;
          },
          response: function(response) {
            console.log('response', response);
            return response;
          },
          responseError: function(rejection) {
            console.log('responseError', rejection);
            return rejection;
          }
        };

        spyOn(interceptor, 'request').and.callThrough();
        spyOn(interceptor, 'requestError').and.callThrough();
        spyOn(interceptor, 'response').and.callThrough();
        spyOn(interceptor, 'responseError').and.callThrough();

        return interceptor;
      });
    }));

    it('should let me intercept the request and response', inject(function($httpBackend, $http) {
      $httpBackend.when('GET', '/something').respond(200, { message: 'hello' });

      $http.get('/something').then(function(response) {
        console.log(response);
      });

      $httpBackend.flush();

      expect(interceptor.request).toHaveBeenCalledWith(jasmine.objectContaining({
        url: '/something',
        method: 'GET'
      }));

      expect(interceptor.response).toHaveBeenCalledWith(jasmine.objectContaining({
        data: { message: 'hello' },
        status: 200,
        config: jasmine.objectContaining({
          url: '/something',
          method: 'GET'
        })
      }));
    }));
  });
});
