angular.module('app', [])
.controller('AppController', function($scope, $timeout) {
  $scope.username = "loki2302";
  $scope.password = "qwerty";

  $scope.handleForm = function() {
    $scope.be.setAllFieldsValid();

    $timeout(function() {
      var errorMap = {
        'username': 'bad bad bad ' + new Date(), 
        'password': 'very bad ' + new Date()
      };

      $scope.be.setFieldErrors(errorMap);
    }, 500);
  };
})
.directive('validationFacade', function() {
  // use like this: <form be="be">
  // this will publish 'be' with setAllFieldsValid and setFieldErrors
  // to the related scope
  return {
    require: 'form',
    link: function(scope, element, attrs, ctrl) {
      var errors = {};
      scope[attrs.validationFacade] = {
        setAllFieldsValid: function() {
          angular.forEach(ctrl, function(formElement, fieldName) {
            if(fieldName[0] === '$') {
              return;
            }

            ctrl[fieldName].$setValidity('omg', true);              
          });
          errors = {};
        },
        setFieldErrors: function(errorMap) {
          angular.forEach(errorMap, function(message, fieldName) {
            ctrl[fieldName].$setValidity('omg', false);
            ctrl[fieldName].$setPristine();
          });
          errors = errorMap;
        },
        getFieldError: function(fieldName) {
          return errors[fieldName];
        },
        isError: function(fieldName) {
          return ctrl[fieldName].$invalid && ctrl[fieldName].$pristine;
        }
      };
    }
  };
});
