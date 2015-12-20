import angular from 'angular'
import uirouter from 'angular-ui-router'

export default angular.module('page2Controller', [uirouter])
.config(function($stateProvider) {
  $stateProvider.state('page2', {
    url: '/page2',
    template: require('./page2.html'),
    controller: function($scope) {

    }
  })
})
.name;
