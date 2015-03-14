describe('$controller', function() {
  it('should let me create a controller via controller constructor function', function() {
    var $injector = angular.injector(['ng']);
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    var dummyController = $controller(function($rootScope) {
      $rootScope.message = 'hello there';
    });

    expect($rootScope.message).toBe('hello there');
  });

  it('should let me create a controller previously registered with $controllerProvider', function() {
    var $injector = angular.injector(['ng', function($controllerProvider) {
      $controllerProvider.register('DummyController', ['$rootScope', function($rootScope) {
        $rootScope.message = 'hello there';
      }]);
    }]);
    var $rootScope = $injector.get('$rootScope');
    var $controller = $injector.get('$controller');

    var dummyController = $controller('DummyController');

    expect($rootScope.message).toBe('hello there');
  });
});

describe('CalculatorController', function() {
  function CalculatorController($scope) {
    $scope.a = null;
    $scope.b = null;
    $scope.result = null;
    $scope.add = function() {
      $scope.result = parseInt($scope.a, 10) + parseInt($scope.b, 10);
    };
  };

  describe('can be tested via scope with no view at all', function() {
    var $scope;
    beforeEach(function() {
      var $injector = angular.injector(['ng', function($controllerProvider) {
        $controllerProvider.register('CalculatorController', CalculatorController);
      }]);
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
      $scope.a = 2;
      $scope.b = 3;
      $scope.add();      
      expect($scope.result).toBe(5);
    });
  });

  describe('can be tested even with plain object instead of scope', function() {
    var $scope;
    beforeEach(function() {
      var $injector = angular.injector(['ng', function($controllerProvider) {
        $controllerProvider.register('CalculatorController', CalculatorController);
      }]);
      var $controller = $injector.get('$controller');

      $scope = {};
      var calculatorController = $controller('CalculatorController', { $scope: $scope });
    });

    it('should be empty by default', function() {    
      expect($scope.a).toBe(null);
      expect($scope.b).toBe(null);
      expect($scope.result).toBe(null);
      expect($scope.add).toBeDefined();
    });

    it('should let me add the numbers', function() {
      $scope.a = 2;
      $scope.b = 3;
      $scope.add();      
      expect($scope.result).toBe(5);
    });
  });

  describe('view<->model', function() {
    var $scope;
    var view;
    beforeEach(function() {
      var $injector = angular.injector(['ng', function($controllerProvider) {
        $controllerProvider.register('CalculatorController', CalculatorController);
      }]);
      var $compile = $injector.get('$compile');
      var $rootScope = $injector.get('$rootScope');
      var $controller = $injector.get('$controller');

      $scope = $rootScope.$new();
      var calculatorController = $controller('CalculatorController', { $scope: $scope });
      view = $compile(
        '<div>' +
        '<input id="a" type="text" ng-model="a">' +
        '<input id="b" type="text" ng-model="b">' +
        '<button type="button" ng-click="add()">Add</button>' +
        '<p id="result">{{result}}</p>' +
        '</div>'
      )($scope);
    });

    describe('interacting with view and looking at scope', function() {
      it('should be empty by default', function() {
        var aElement = view.find('#a');
        var bElement = view.find('#b');
        var resultElement = view.find('#result');

        $scope.$digest();

        expect($scope.a).toBe(null);
        expect($scope.b).toBe(null);
        expect($scope.result).toBe(null);
      });

      it('should let me add the numbers', function() {
        var aElement = view.find('#a');
        var bElement = view.find('#b');
        var addElement = view.find('button');
        var resultElement = view.find('#result');

        $scope.$digest();

        aElement.val('2');
        aElement.change();
        expect($scope.a).toBe('2');

        bElement.val('3');
        bElement.change();
        expect($scope.b).toBe('3');

        expect($scope.result).toBe(null);
        addElement.click();
        expect($scope.result).toBe(5);
      });
    });

    describe('iteracting with scope and looking at view', function() {
      it('should be empty by default', function() {
        var aElement = view.find('#a');
        var bElement = view.find('#b');
        var resultElement = view.find('#result');

        $scope.$digest();

        expect(aElement.val()).toBe('');
        expect(bElement.val()).toBe('');
        expect(resultElement.text()).toBe('');
      });

      it('should let me add the numbers', function() {
        var aElement = view.find('#a');
        var bElement = view.find('#b');
        var addElement = view.find('button');
        var resultElement = view.find('#result');

        $scope.$digest();

        $scope.a = '2';
        $scope.$digest();
        expect(aElement.val()).toBe('2');

        $scope.b = '3';
        $scope.$digest();
        expect(bElement.val()).toBe('3');

        expect(resultElement.text()).toBe('');
        $scope.add();
        $scope.$digest();
        expect(resultElement.text()).toBe('5');
      });
    });
  });
});
