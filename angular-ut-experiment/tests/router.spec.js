// TODO: check if it loads templates via $http
// TODO: check how resolve works (and triggers $routeChangeError if there's a rejection)
// TODO: check if $routeChangeError gets propagated to $exceptionHandler
// TODO: check <ng-view/>
// TODO: check how .otherwise() works
// TODO: check params

describe('$routeProvider', function() {
  var $location;
  var $rootScope;
  var $route;
  var $q;
  var onRouteChangeStart;
  var onRouteChangeSuccess;
  var onRouteChangeError;
  var resolveData;

  beforeEach(function() {
    resolveData = jasmine.createSpy('resolveData');

    var $injector = angular.injector(['ng', 'ngMock', 'ngRoute', function($routeProvider) {
      $routeProvider.when('/', {
        controller: 'DummyController',
        template: 'template for dummy controller',
        resolve: {
          data: resolveData
        }
      });
    }, function($controllerProvider) {
      $controllerProvider.register('DummyController', function($scope) {
        // !!! The controller does not get constructed, looks like it needs <ng-view /> for this
      });
    }]);

    $location = $injector.get('$location');
    $rootScope = $injector.get('$rootScope');
    $route = $injector.get('$route');    
    $q = $injector.get('$q');

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
        $location.path('/');
      });

      describe('and there is NO data to resolve asynchronously', function() {
        beforeEach(function() {
          resolveData.and.returnValue('the data');
          $rootScope.$digest();
        });

        it('should broadcast $routeChangeStart and $routeChangeSuccess', function() {          
          expect(onRouteChangeStart).toHaveBeenCalled();
          expect(onRouteChangeSuccess).toHaveBeenCalled();
          expect(onRouteChangeError).not.toHaveBeenCalled();
          // TODO: check call args
        });

        it('should update $route.current respectively', function() {
          expect($route.current.controller).toBe('DummyController');
          expect($route.current.template).toBe('template for dummy controller');
          expect($route.current.locals.data).toBe('the data');
        });
      });

      describe('and there is data to resolve asynchronously', function() {
        var dataDeferred;
        beforeEach(function() {
          dataDeferred = $q.defer();
          resolveData.and.returnValue(dataDeferred.promise);
          $rootScope.$digest();
        });

        it('should broadcast $routeChangeStart only', function() {
          expect(onRouteChangeStart).toHaveBeenCalled();
          expect(onRouteChangeSuccess).not.toHaveBeenCalled();
          expect(onRouteChangeError).not.toHaveBeenCalled();
        });

        describe('and when this data is resolved successfully', function() {
          beforeEach(function() {
            $rootScope.$apply(function() {
              dataDeferred.resolve('async data');
            });            
          });

          it('should broadcast $routeChangeSuccess', function() {
            expect(onRouteChangeSuccess).toHaveBeenCalled();
            expect(onRouteChangeError).not.toHaveBeenCalled();
          });

          it('should update $route.current respectively', function() {
            expect($route.current.controller).toBe('DummyController');
            expect($route.current.template).toBe('template for dummy controller');
            expect($route.current.locals.data).toBe('async data');
          });
        });

        describe('and when this data is resolved with error', function() {
          beforeEach(function() {
            $rootScope.$apply(function() {
              dataDeferred.reject('no async data');
            });
          });

          it('should broadcast $routeChangeError', function() {
            expect(onRouteChangeError).toHaveBeenCalled();
            expect(onRouteChangeSuccess).not.toHaveBeenCalled();            
            expect(onRouteChangeError.calls.mostRecent().args[3/*rejection*/]).toBe('no async data');
          });

          // that's surprising          
          xit('should keep $route.current undefined', function() {
            expect($route.current).toBeUndefined();
          });

          // TODO: check if it's supposed to be like this
          it('should still update $route.current respectively', function() {
            expect($route.current.controller).toBe('DummyController');
            expect($route.current.template).toBe('template for dummy controller');
            expect($route.current.locals).toBeUndefined();
          });
        });
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
