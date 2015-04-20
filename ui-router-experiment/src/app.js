angular.module('app', ['ui.router'])
.config(function($stateProvider) {
  $stateProvider
  .state('index', {
    url: '',
    views: {
      viewA: {
        template: 'index-viewA'
      },
      viewB: {
        template: 'index-viewB'
      }
    }
  })
  .state('stateA', {
    url: 'a',
    views: {
      viewA: {
        template: 'stateA-viewA'
      },
      viewB: {
        template: 'stateA-viewB'
      }
    }
  })
  .state('stateB', {
    url: 'b',
    views: {
      viewA: {
        template: 'stateB-viewA'
      },
      viewB: {
        template: 'stateB-viewB'
      }
    }
  });
});
