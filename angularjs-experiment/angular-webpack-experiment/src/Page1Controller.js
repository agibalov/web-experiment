import angular from 'angular'
import uirouter from 'angular-ui-router'
import dummy from './dummy'

export default angular.module('page1Controller', [uirouter, dummy])
.config($stateProvider => {
  $stateProvider.state('page1', {
    url: '/page1',
    template: `
    <h1>page1</h1>
    <p>the new page1 template</p>
    <p>initial data: {{initialData}}</p>
    <p>Count: {{count}}</p>
    <button type="button" ng-click="onButtonClicked()">Hello</button>
    `,
    resolve: {
      // NOTE: the code generated for async is pretty much obfuscation,
      // so explicit injection annotations are required
      initialData: ['dummyService', async dummyService => {
        var data1 = await dummyService.getData(1)
        var data2 = await dummyService.getData(2)
        return data1 + ' ' + data2
      }]
    },
    controller: ($scope, initialData, dummyService) => {
      $scope.initialData = initialData
      $scope.count = 0

      // NOTE: because Babel/Native promises are not $q promises,
      // explicit $digest is required
      $scope.onButtonClicked = async () => {
        $scope.count = await dummyService.getCount()
        $scope.$digest()
      };
    }
  })
})
.name
