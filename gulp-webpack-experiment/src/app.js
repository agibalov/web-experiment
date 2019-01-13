var angular = require('angular');

angular.module('app', [])
.controller('HelloController', ['$scope', function($scope) {
  $scope.message = 'hello from angular';
}]);
