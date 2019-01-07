angular.module('app', ['ngAnimate'])
.controller('AppController', function($scope) {
  $scope.message = 'hello world';
  $scope.items = [
    'hello',
    'there'
  ];

  $scope.addItem = function() {
    $scope.items.push(Math.random());
  };

  $scope.removeItem = function(item) {
    var itemIndex = $scope.items.indexOf(item);
    if(itemIndex === -1) {
      return;
    }

    $scope.items.splice(itemIndex, 1);
  };
});
