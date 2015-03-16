describe('Exception handling', function() {
  describe('Custom $exceptionHandler', function() {
    it('should work', function() {
      var lastException;
      var $injector = angular.injector(['ng', function($provide) {
        $provide.factory('$exceptionHandler', function() {
          return function(exception, cause) {
            lastException = exception;
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      $rootScope.$apply(function() {
        throw new Error('hello there');
      });

      expect(lastException.message).toBe('hello there');
    });
  });

  describe('Mock $exceptionHandler', function() {
    describe('in rethrow mode', function() {
      it('should work', function() {
        var $injector = angular.injector(['ng', 'ngMock', function($exceptionHandlerProvider) {
          $exceptionHandlerProvider.mode('rethrow');
        }]);

        var $rootScope = $injector.get('$rootScope');
        expect(function() {
          $rootScope.$apply(function() {
            throw new Error('hello there');
          });
        }).toThrow(new Error('hello there'));
      });
    });

    describe('in log mode', function() {
      it('should work', function() {
        var $injector = angular.injector(['ng', 'ngMock', function($exceptionHandlerProvider) {
          $exceptionHandlerProvider.mode('log');
        }]);

        var $exceptionHandler = $injector.get('$exceptionHandler');
        expect($exceptionHandler.errors).toEqual([]);

        var $rootScope = $injector.get('$rootScope');
        $rootScope.$apply(function() {
          throw new Error('hello there');
        });

        expect($exceptionHandler.errors.length).toBe(1);
        expect($exceptionHandler.errors[0].constructor).toBe(Error);
        expect($exceptionHandler.errors[0].message).toBe('hello there');
      });
    });    
  });
});
