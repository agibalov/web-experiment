describe('validationFacade directive', function() {
  var $scope;
  var $compile;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('should publish a validation facade on the related scope', function() {
    var element = $compile('<form validation-facade="vf"></form>')($scope);
    expect($scope.vf).toBeDefined();
  });

  it('should set form field validity based on error map', function() {
    var element = $compile(
    '<form name="f" validation-facade="vf">' + 
    '  <input type="text" name="username" ng-model="username">' +
    '  <input type="password" name="password" ng-model="password">' +
    '</form>')($scope);

    $scope.vf.setFieldErrors({
      username: 'bad username',
      password: 'very bad password'
    });

    expect($scope.f.$valid).toBe(false);
    expect($scope.f.username.$valid).toBe(false);
    expect($scope.f.password.$valid).toBe(false);

    expect($scope.vf.getFieldError('username')).toBe('bad username');
    expect($scope.vf.getFieldError('password')).toBe('very bad password');
  });

  it('should reset form validity', function() {
    var element = $compile(
    '<form name="f" validation-facade="vf">' + 
    '  <input type="text" name="username" ng-model="username">' +
    '  <input type="password" name="password" ng-model="password">' +
    '</form>')($scope);

    $scope.vf.setFieldErrors({
      username: 'bad username',
      password: 'very bad password'
    });

    $scope.vf.setAllFieldsValid();

    expect($scope.f.$valid).toBe(true);
    expect($scope.f.username.$valid).toBe(true);
    expect($scope.f.password.$valid).toBe(true);

    expect($scope.vf.getFieldError('username')).not.toBeDefined();
    expect($scope.vf.getFieldError('password')).not.toBeDefined();
  });
});
