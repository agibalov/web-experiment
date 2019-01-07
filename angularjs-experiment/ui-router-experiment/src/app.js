angular.module('app', ['ui.router'])
.config(function($urlRouterProvider) {
	$urlRouterProvider.otherwise("/");
})
.config(function($stateProvider) {
  $stateProvider
  .state('things', {
    abstract: true,
    resolve: {
      things: function() {
        return ['thing1', 'thing2', 'thing3'];
      }
    },
    views: {
      viewA: {
        template:
        '<ul><li ng-repeat="thing in things"><a ui-sref="things.thing({ thing: thing })" ui-sref-opts="{location:' + "'replace'" + '}">{{thing}}</a></li></ul>' +
        '<p>Navigating between these does not affect the backstack</p>',
        controller: function($scope, things) {
          $scope.things = things;
        }
      },
      viewB: {
        template: '<ui-view></ui-view>'
      }
    }
  })
  .state('things.none', {
    url: '/things',
    template: 'none selected',
    controller: function($scope) {}
  })
  .state('things.thing', {
    url: '/things/:thing',
    template: 'Selected {{thing}} (total things: {{totalThings}})',
    controller: function($scope, $stateParams, things) {
      $scope.thing = $stateParams.thing;
      $scope.totalThings = things.length;
    }
  })
  .state('index', {
    url: '/',
    onEnter: function(indexCommonThing) {
      console.log('index - onEnter', indexCommonThing);
    },
    onExit: function(indexCommonThing) {
      console.log('index - onExit', indexCommonThing);
    },
    resolve: {
      // available to both sub-views
      indexCommonThing: function() {
        return 'omg';
      }
    },
    views: {
      viewA: {
        template: 'index-viewA: {{indexMessageForViewA}}',
        controller: function($scope, indexCommonThing) {
          $scope.indexMessageForViewA = '111' + indexCommonThing;
        }
      },
      viewB: {
        template: 'index-viewB: {{indexMessageForViewB}}',
        controller: function($scope, indexCommonThing) {
          $scope.indexMessageForViewB = '222' + indexCommonThing;
        }
      },
    }
  })
  .state('stateA', {
    url: '/a/:something',
    onEnter: function(something) {
      console.log('stateA - onEnter, something=', something);
    },
    onExit: function() {
      console.log('stateA - onExit');
    },
    resolve: {
      something: function($stateParams) {
        return $stateParams.something;
      }
    },
    views: {
      viewA: {
        template: 'stateA-viewA: {{stateAMessageForViewA}}',
        controller: function($scope, $stateParams) {
          $scope.stateAMessageForViewA = '333, something=' + $stateParams.something;
        }
      },
      viewB: {
        template: 'stateA-viewB: {{stateAMessageForViewB}}',
        controller: function($scope) {
          $scope.stateAMessageForViewB = '444';
        }
      },
    }
  })
  .state('stateB', {
    url: '/stateB',
    onEnter: function() {
      console.log('stateB - onEnter');
    },
    onExit: function() {
      console.log('stateB - onExit');
    },
    views: {
      viewA: {
        template: 'stateB-viewA: {{stateBMessageForViewA}}',
        controller: function($scope) {
          $scope.stateBMessageForViewA = '555';
        }
      },
      viewB: {
        template: 'stateB-viewB: {{stateBMessageForViewB}}',
        controller: function($scope) {
          $scope.stateBMessageForViewB = '666';
        }
      },
    }
  });
});
