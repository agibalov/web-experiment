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
});
