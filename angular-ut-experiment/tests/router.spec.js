// TODO: check if it loads templates via $http
// TODO: check how resolve works (and triggers $routeChangeError if there's a rejection)
// TODO: check if $routeChangeError gets propagated to $exceptionHandler
// TODO: check <ng-view/>
// TODO: check how .otherwise() works

describe('$routeProvider', function() {
  var $location;
  var $rootScope;
  var $route;
  var onRouteChangeStart;
  var onRouteChangeSuccess;
  var onRouteChangeError;

  beforeEach(function() {
    var $injector = angular.injector(['ng', 'ngMock', 'ngRoute', function($routeProvider) {
      $routeProvider.when('/', {
        controller: 'DummyController',
        template: 'template for dummy controller',
      });
    }, function($controllerProvider) {
      $controllerProvider.register('DummyController', function($scope) {
        // !!! The controller does not get constructed, looks like it needs <ng-view /> for this
      });
    }]);

    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $route = $injector.get('$route');    

    onRouteChangeStart = jasmine.createSpy('onRouteChangeStart');
    onRouteChangeSuccess = jasmine.createSpy('onRouteChangeSuccess');
    onRouteChangeError = jasmine.createSpy('onRouteChangeError');

    $rootScope.$on('$routeChangeStart', onRouteChangeStart);
    $rootScope.$on('$routeChangeSuccess', onRouteChangeSuccess);
    $rootScope.$on('$routeChangeError', onRouteChangeError);
  });

  it('should have no current route by default', function() {
    expect($route.current).toBeUndefined();
  });

  describe('when $location is changed', function() {
    describe('and the new $location is recognized', function() {
      beforeEach(function() {
        $rootScope.$apply(function() {
          $location.path('/');
        });
      });

      it('should broadcast $routeChangeStart and $routeChangeSuccess', function() {
        expect(onRouteChangeStart).toHaveBeenCalled();
        expect(onRouteChangeSuccess).toHaveBeenCalled();
        expect(onRouteChangeError).not.toHaveBeenCalled();
      });

      it('should update $route.current respectively', function() {
        expect($route.current.controller).toBe('DummyController');
        expect($route.current.template).toBe('template for dummy controller');
      });
    });

    describe('and the new $location is not recognized', function() {
      beforeEach(function() {
        $rootScope.$apply(function() {
          $location.path('/unknown-location');
        });
      });

      it('should not broadcast any events', function() {
        expect(onRouteChangeStart).not.toHaveBeenCalled();
        expect(onRouteChangeSuccess).not.toHaveBeenCalled();
        expect(onRouteChangeError).not.toHaveBeenCalled();
      });

      it('should keep $route.current undefined', function() {
        expect($route.current).toBeUndefined();
      });
    });
  });  
});
