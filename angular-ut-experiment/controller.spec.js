angular.module('controllerApp', [])
.controller('DummyController', ['$scope', function($scope) {
  $scope.message = 'hello';
  $scope.updateMessage = function() {
    $scope.message = 'hi there';
  };
}]);

describe('DummyController', function() {
  beforeEach(module('controllerApp'));

  var $controller;
  var $rootScope;
  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  it('sets message to hello by default', function() {
    var $scope = $rootScope;
    var controller = $controller('DummyController', { $scope: $scope });

    $scope.$digest();
    expect($scope.message).toEqual('hello');
  });

  it('sets message to hi there when I trigger updateMessage', function() {
    var $scope = $rootScope;
    var controller = $controller('DummyController', { $scope: $scope });

    $scope.$digest();
    expect($scope.message).toEqual('hello');

    $scope.updateMessage();
    expect($scope.message).toEqual('hi there');
  });
});
