angular.module('app', [])
.directive('listEditor', function($parse) {
  return {
    scope: true,
    link: function(scope, element, attrs, controller, transclude) {
      scope[attrs.as] = {
        removeItem: function(item) {
          var itemIndex = $parse(attrs.for)(scope).indexOf(item);
          if(itemIndex < 0) {
            throw new Error('Did not find an item');
          }

          $parse(attrs.for)(scope).splice(itemIndex, 1);
        },
        newItem: {},
        addItem: function(item) {
          $parse(attrs.for)(scope).push(scope[attrs.as].newItem);
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
