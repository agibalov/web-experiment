angular.module('app', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
  .state('index', {
    url: '',
    onEnter: function() {
      console.log('index - onEnter');
    },
    onExit: function() {
      console.log('index - onExit');
    },
    views: {
      viewA: {
        template: 'index-viewA: {{indexMessageForViewA}}',
        controller: function($scope) {
          $scope.indexMessageForViewA = '111';
        }
      },
      viewB: {
        template: 'index-viewB: {{indexMessageForViewB}}',
        controller: function($scope) {
          $scope.indexMessageForViewB = '222';
        }
      },
    }
  })
  .state('stateA', {
    url: 'a',
    onEnter: function() {
      console.log('stateA - onEnter');
    },
    onExit: function() {
      console.log('stateA - onExit');
    },
    views: {
      viewA: {
        template: 'stateA-viewA: {{stateAMessageForViewA}}',
        controller: function($scope) {
          $scope.stateAMessageForViewA = '333';
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
    url: 'stateB',
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
