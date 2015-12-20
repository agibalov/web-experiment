import 'bootstrap/dist/css/bootstrap.css'

import angular from 'angular'
import appControllerModule from './AppController'
import page1ControllerModule from './Page1Controller'
import page2ControllerModule from './Page2Controller'

angular.module('app', [
  appControllerModule,
  page1ControllerModule,
  page2ControllerModule
])
.config(function($urlRouterProvider) {
  $urlRouterProvider.otherwise('/page1');
});
