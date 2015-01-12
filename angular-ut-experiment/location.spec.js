describe('location', function() {
  // note that location doesn't get reset automatically from test to test

  it('should let me set and get the current path', function() {
    var $injector = angular.injector(['ng', function($provide) {
      $provide.constant('$rootElement', angular.element('<div></div>'));
    }]);

    var $location = $injector.get('$location');
    var $rootScope = $injector.get('$rootScope');
    $rootScope.$apply(function() {
      $location.path('/dummy');
    });

    expect($location.path()).toBe('/dummy');
  });

  it('should let me set and get the current URL', function() {
    var $injector = angular.injector(['ng', function($provide) {
      $provide.constant('$rootElement', angular.element('<div></div>'));
    }]);

    var $location = $injector.get('$location');
    var $rootScope = $injector.get('$rootScope');
    $rootScope.$apply(function() {
      $location.url('/dummy?a=1');
    });

    expect($location.url()).toBe('/dummy?a=1');
  });

  it('should let me set and get the search', function() {
    var $injector = angular.injector(['ng', function($provide) {
      $provide.constant('$rootElement', angular.element('<div></div>'));
    }]);

    var $location = $injector.get('$location');
    var $rootScope = $injector.get('$rootScope');
    $rootScope.$apply(function() {
      $location.url('/dummy');
      $location.search('message', 'hi there');
      $location.search('a', 123);
    });

    expect($location.url()).toBe('/dummy?message=hi%20there&a=123');

    var search = $location.search();
    expect(search.message).toBe('hi there');
    expect(search.a).toBe(123);
  });

  it('should let me set multiple search parameters at once', function() {
    var $injector = angular.injector(['ng', function($provide) {
      $provide.constant('$rootElement', angular.element('<div></div>'));
    }]);

    var $location = $injector.get('$location');
    var $rootScope = $injector.get('$rootScope');
    $rootScope.$apply(function() {
      $location.url('/dummy');
      $location.search({
        message: 'hi there',
        a: 123
      });
    });

    expect($location.url()).toBe('/dummy?message=hi%20there&a=123');

    var search = $location.search();
    expect(search.message).toBe('hi there');
    expect(search.a).toBe(123);
  });

  it('should notify me when location is changed', function(done) {
    var $injector = angular.injector(['ng', function($provide) {
      $provide.constant('$rootElement', angular.element('<div></div>'));
    }]);

    var $location = $injector.get('$location');
    var $rootScope = $injector.get('$rootScope');
    $rootScope.$apply(function() {
      $location.path('/dummy');
    });

    $rootScope.$on('$locationChangeStart', function(e, next, current) {
      expect(next).toContain('#/test');
      expect(current).toContain('#/dummy');
    });

    $rootScope.$on('$locationChangeSuccess', function(e, next, current) {
      expect(next).toContain('#/test');
      expect(current).toContain('#/dummy');
      done();
    });

    $rootScope.$apply(function() {
      $location.path('/test');
    });
  });
});
