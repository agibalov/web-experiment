import angular from 'angular'

export default angular.module('appController', [])
.controller('AppController', $scope => {
  $scope.message = 'hello there'
})
.name
