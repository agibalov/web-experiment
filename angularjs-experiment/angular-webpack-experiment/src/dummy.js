import angular from 'angular'

export default angular.module('dummy', [])
.factory('dummyService', ($q, $timeout, $rootScope) => {
  var count = 0
  return {
    getData: x => {
      return $q(resolve => {
        $timeout(() => {
          resolve('i am data ' + x)
        }, 1000)
      })
    },
    getCount: () => {
      return $q(resolve => {
        $timeout(() => {
          resolve(++count)
        }, 500)
      })
    }
  }
})
.name
