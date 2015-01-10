describe('scope', function() {
  it('there is a single $rootScope', function() {
    var $injector = angular.injector(['ng']);
    expect($injector.get('$rootScope')).toBe($injector.get('$rootScope'));
  });

  it('$watch does not update anything without a $digest call', function() {
    var $injector = angular.injector(['ng']);
    var $scope = $injector.get('$rootScope');
    $scope.name = 'loki2302';
    $scope.$watch('name', function(newValue, oldValue) {
      $scope.message = 'hi ' + $scope.name + '!';
    });
    expect($scope.message).toBeUndefined();
  });

  it('$watch updates everything when $digest is called', function() {
    var $injector = angular.injector(['ng']);
    var $scope = $injector.get('$rootScope');
    $scope.name = 'loki2302';
    $scope.$watch('name', function(newValue, oldValue) {
      $scope.message = 'hi ' + $scope.name + '!';
    });
    $scope.$digest();
    expect($scope.message).toBe('hi loki2302!');
  });

  it('$apply calls $digest internally', function() {
    var $injector = angular.injector(['ng']);
    var $scope = $injector.get('$rootScope');
    $scope.name = 'loki2302';
    $scope.$watch('name', function(newValue, oldValue) {
      $scope.message = 'hi ' + $scope.name + '!';
    });
    $scope.$apply(function() {
      $scope.name = 'Andrey';
    });
    expect($scope.message).toBe('hi Andrey!');
  });

  it('$eval evaluates the expression based on the scope', function() {
    var $injector = angular.injector(['ng']);
    var $scope = $injector.get('$rootScope');
    $scope.name = 'loki2302';
    $scope.a = 2;
    $scope.b = [3, 7];
    expect($scope.$eval('name')).toBe('loki2302');
    expect($scope.$eval('a+b[0]')).toBe(5);
    expect($scope.$eval(function(scope) {
      return scope.name + '_' + scope.a + '_' + scope.b;
    })).toBe('loki2302_2_3,7');
  });

  it('$new can create a child scope that inherits a parent scope', function() {
    var $injector = angular.injector(['ng']);
    var $rootScope = $injector.get('$rootScope');
    var $childScope = $rootScope.$new(false);

    $rootScope.name = 'loki2302';
    // $rootScope.$digest(); // this call doesn't do anything
    expect($rootScope.name).toBe('loki2302');
    expect($childScope.name).toBe('loki2302');

    $childScope.name = 'Andrey';
    // $childScope.$digest(); // this call doesn't do anything
    expect($rootScope.name).toBe('loki2302'); // only the child scope is updated
    expect($childScope.name).toBe('Andrey');
  });

  it('$new can create a child scope that does not inherit a parent scope', function() {
    var $injector = angular.injector(['ng']);
    var $rootScope = $injector.get('$rootScope');
    var $childScope = $rootScope.$new(true);

    $rootScope.name = 'loki2302';
    expect($rootScope.name).toBe('loki2302');
    expect($childScope.name).toBeUndefined(); // rootScope's 'name' is not visible here

    $childScope.name = 'Andrey';
    expect($rootScope.name).toBe('loki2302'); // the root sope is not affected
    expect($childScope.name).toBe('Andrey'); // only the child scope is updated
  });
});
