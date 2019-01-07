import 'angular-material/angular-material.min.css'
import './index.html'

import 'babel-polyfill'
import angular from 'angular'
import ngMaterial from 'angular-material'

angular.module('app', [ngMaterial])
.controller('AppController', ($scope, $mdToast) => {
  $scope.a = 2
  $scope.b = 3
  $scope.add = () => {
    var result = parseInt($scope.a) + parseInt($scope.b)
    $mdToast.showSimple('Result is ' + result)
  }

  $scope.items = [
    'List item one',
    'List item two',
    'List item three',
    'List item four',
    'List item five',
    'List item six',
    'List item seven',
    'List item eight',
    'List item nine'
  ]
})
