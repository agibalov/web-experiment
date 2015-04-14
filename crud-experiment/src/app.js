angular.module('app', [])
.directive('listEditor', function() {
  return {
    scope: true,
    link: function(scope, element, attrs, controller, transclude) {
      scope[attrs.as] = {
        removeItem: function(item) {
          var itemIndex = scope.$eval(attrs.for).indexOf(item);
          if(itemIndex < 0) {
            throw new Error('Did not find an item');
          }

          scope.$eval(attrs.for).splice(itemIndex, 1);
        },
        newItem: {},
        addItem: function(item) {
          scope.$eval(attrs.for).push(scope[attrs.as].newItem);
          scope[attrs.as].newItem = {};
        }
      };
    }
  };
})
.controller('AppController', function($scope) {
  $scope.messageFromController = 'message from controller';

  $scope.course = {
    title: 'Math',
    teachers: [
      { name: 'Teacher One' },
      { name: 'Teacher Two' }
    ],
    students: [
      { name: 'Student One' },
      { name: 'Student Two' },
      { name: 'Student Three' }
    ]
  };
});
