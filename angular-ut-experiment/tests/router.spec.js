// TODO: check if loads templates via $http
// TODO: check the case when there's no such route and no .otherwise()
// TODO: check how resolve works
// TODO: check <ng-view/>

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

  it('should broadcast $routeChangeStart and $routeChangeSuccess when $location is changed', function() {
    $location.path('/');
    expect(onRouteChangeStart).not.toHaveBeenCalled();
    expect(onRouteChangeSuccess).not.toHaveBeenCalled();
    expect(onRouteChangeError).not.toHaveBeenCalled();

    $rootScope.$digest();
    expect(onRouteChangeStart).toHaveBeenCalled();
    expect(onRouteChangeSuccess).toHaveBeenCalled();
    expect(onRouteChangeError).not.toHaveBeenCalled();
  });

  it('should change the $route.current when $location is changed', function() {
    $location.path('/');
    $rootScope.$digest();

    expect($route.current.controller).toBe('DummyController');
    expect($route.current.template).toBe('template for dummy controller');
  });
});