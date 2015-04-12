angular.module('app', [])
.directive('entityEditor', function() {
  return {
    restrict: 'E',
    scope: {
      entity: '=',
      onSubmitEntity: '&'
    },
    template: function(element) {
      var html = element.html();
      html =
      '<form ng-submit="onSubmit($event)">' +
      html +
      '</form>';
      return html;
    },
    link: function(scope, element, attrs, parentCtrl) {
      console.log(scope.entity);

      scope.onSubmit = function(e) {
        e.preventDefault();
        scope.onSubmitEntity({ entity: scope.entity });
      };
    }
  };
})
.directive('relatedEntityEditor', function() {
  return {
    restrict: 'E',
    scope: {
      entities: '='
    },
    template: function(element) {
      return element.html();
    },
    link: function(scope) {
      scope.addItem = function(item) {
        console.log('addItemNew', item);
        scope.entities.push(item);
      };

      scope.removeItem = function(item) {
        console.log('removeItemNew', item);

        var itemIndex = scope.entities.indexOf(item);
        if(itemIndex < 0) {
          throw new Error('Did not find the item');
        }

        scope.entities.splice(itemIndex, 1);
      };
    }
  };
})
.controller('AppController', function($scope) {
  $scope.messageFromController = 'message from controller';
  $scope.myCategory = {
    name: 'entity name here',
    posts: [
      { id: 1, title: 'porn' },
      { id: 2, title: 'lesbians' },
      { id: 3, title: 'more porn' }
    ]
  };

  $scope.handleEntity = function(c) {
    console.log('Got updated category', c);
  };
});
