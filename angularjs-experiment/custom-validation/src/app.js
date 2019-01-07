angular.module('app', [])
.controller('AppController', function($scope, $timeout, $q) {
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

  $scope.handleForm2 = function() {
    console.log('handleForm2() called');

    var deferred = $q.defer();
    $timeout(function() {
      var errorMap = {
        'username': 'bad bad bad ' + new Date(),
        'password': 'very bad ' + new Date()
      };

      deferred.reject(errorMap);
    }, 500);
    return deferred.promise;
  };
})
.directive('mySubmit', function() {
  // use like this: <form my-submit="doSomething()">
  // this will listen to form's submit event, and once trigger
  // will call doSomething() and wait for the returned promise to
  // either get resolved or rejected
  return {
    restrict: 'A',
    require: 'form',
    link: function(scope, element, attrs, formController) {
      console.log('got formController', formController);

      var $element = angular.element(element);
      $element.bind('submit', function(e) {
        e.preventDefault();

        console.log('mySubmit calls the handler');
        scope.$apply(function() {
          setAllFieldsValid();
        });

        scope.$eval(attrs.mySubmit).then(function(result) {
          console.log('mySubmit handler succeeded', result);
        }, function(error) {
          console.log('mySubmit handler rejected', error);
          setFieldErrors(error);
        });
      });
      // TODO: should I unbind?

      var errors = {};
      function setAllFieldsValid() {
        angular.forEach(formController, function(formElement, fieldName) {
          if(fieldName[0] === '$') {
            return;
          }

          formController[fieldName].$setValidity('omg', true);
        });
        errors = {};
      };

      function setFieldErrors(errorMap) {
        angular.forEach(errorMap, function(message, fieldName) {
          formController[fieldName].$setValidity('omg', false);
          formController[fieldName].$setPristine();
        });
        errors = errorMap;
      };

      scope.vf2 = {
        isError: function(fieldName) {
          return formController[fieldName].$invalid &&
            formController[fieldName].$pristine;
        },
        getFieldError: function(fieldName) {
          return errors[fieldName];
        }
      };
    }
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
