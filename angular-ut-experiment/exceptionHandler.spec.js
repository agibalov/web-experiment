describe('exceptionHandler', function() {
  it('works', function() {
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
