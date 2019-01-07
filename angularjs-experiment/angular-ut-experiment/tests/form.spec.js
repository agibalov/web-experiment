describe('form', function() {
  describe('in general', function() {
    var $scope;
    var $compile;

    beforeEach(inject(function($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
    }));

    it('can be submitted', function() {
      var element = $compile(
      '<form name="f" ng-submit="handleForm()">' +
      ' <input type="text" ng-model="username" name="uname">' +
      ' <button type="submit">Submit</button>' +
      '</form>'
      )($scope);

      $scope.username = 'loki2302';
      $scope.handleForm = jasmine.createSpy('handleForm');
      
      $scope.$digest();
      element.children('button').click();

      expect($scope.handleForm).toHaveBeenCalled();
      expect($scope.f.$dirty).toBe(false);
      expect($scope.f.$pristine).toBe(true);
      expect($scope.f.$valid).toBe(true);
      expect($scope.f.$invalid).toBe(false);
      expect($scope.f.$submitted).toBe(true);
    });

    it('can be validated', function() {
      var element = $compile(
      '<form name="f" ng-submit="handleForm()">' +
      ' <input type="text" ng-model="username" name="uname" required>' +
      ' <button type="submit">Submit</button>' +
      '</form>'
      )($scope);

      $scope.username = '';
      $scope.handleForm = jasmine.createSpy('handleForm');
      
      $scope.$digest();
      element.children('button').click();

      expect($scope.handleForm).not.toHaveBeenCalled();
      expect($scope.f.$dirty).toBe(false);
      expect($scope.f.$pristine).toBe(true);
      expect($scope.f.$valid).toBe(false);
      expect($scope.f.$invalid).toBe(true);
      expect($scope.f.$submitted).toBe(false);
      expect($scope.f.$error.required[0].$name).toBe('uname');
      expect($scope.f.uname.$untouched).toBe(true);
      expect($scope.f.uname.$touched).toBe(false);
      expect($scope.f.uname.$pristine).toBe(true);
      expect($scope.f.uname.$dirty).toBe(false);
      expect($scope.f.uname.$valid).toBe(false);
      expect($scope.f.uname.$invalid).toBe(true);
      expect($scope.f.uname.$error.required).toBe(true);
    });
  });

  describe('custom validaton', function() {
    it('should let me validate things synchronously', function() {
        var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('username', function() {
          return {
            require: 'ngModel',
            link: function(scope, element, attrs, ctrl) {
              ctrl.$validators.username = function(modelValue, viewValue) {
                return viewValue === 'loki2302';
              };
            }
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile(
      '<form name="f">' +
      ' <input type="text" ng-model="username" name="uname" username>' +
      ' <button type="submit">Submit</button>' +
      '</form>'
      )($rootScope);

      $rootScope.$digest();
      element.children('button').click();

      expect($rootScope.f.uname.$error.username).toBe(true);
    });
  });
});
