angular.module('test.controller', [])
.controller('CalculatorController', function($scope) {
  $scope.a = null;
  $scope.b = null;
  $scope.result = null;
  $scope.add = function() {
    $scope.result = parseInt($scope.a, 10) + parseInt($scope.b, 10);
  };
});

describe('$controller', function() {
  it('should let me create a controller without module', function() {
    var $injector = angular.injector(['ng']);
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    var dummyController = $controller(function($rootScope) {
      $rootScope.message = 'hello there';
    });

    expect($rootScope.message).toBe('hello there');
  });
});

describe('CalculatorController', function() {
  var $scope;
  beforeEach(function() {
    var $injector = angular.injector(['ng', 'test.controller']);
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    $scope = $rootScope.$new();
    var calculatorController = $controller('CalculatorController', { $scope: $scope });
  });

  it('should be empty by default', function() {    
    expect($scope.a).toBe(null);
    expect($scope.b).toBe(null);
    expect($scope.result).toBe(null);
    expect($scope.add).toBeDefined();
  });

  it('should let me add the numbers', function() {
    $scope.$apply(function() {
      $scope.a = 2;
      $scope.b = 3;
    });
    $scope.add();
    
    expect($scope.result).toBe(5);
  });
});
