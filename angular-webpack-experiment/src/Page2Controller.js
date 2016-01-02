import angular from 'angular'
import uirouter from 'angular-ui-router'

export default angular.module('page2Controller', [uirouter])
.config($stateProvider => {
  $stateProvider.state('page2', {
    url: '/page2',
    template: require('./page2.html'),
    controller: $scope => {
    }
  })
})
.name
