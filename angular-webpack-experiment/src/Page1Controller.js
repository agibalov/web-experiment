import angular from 'angular'
import uirouter from 'angular-ui-router'

export default angular.module('page1Controller', [uirouter])
.config($stateProvider => {
  $stateProvider.state('page1', {
    url: '/page1',
    template: require('./page1.html'),
    controller: function($scope) {
    }
  })
})
.name;
