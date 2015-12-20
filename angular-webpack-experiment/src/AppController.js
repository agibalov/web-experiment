import angular from 'angular'

export default angular.module('appController', [])
.controller('AppController', function($scope) {
  $scope.message = 'hello there';
})
.name;
