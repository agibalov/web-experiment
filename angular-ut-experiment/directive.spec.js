angular.module('directiveApp', [])
.directive('dummy', function() {
  return function(scope, element) {
    element.addClass('omg');
  };
});

describe('dummy directive', function() {
  var element;
  var $scope;
  beforeEach(module('directiveApp'));
  beforeEach(inject(function($compile, $rootScope) {
    $scope = $rootScope;
    element = angular.element('<div dummy></div>');
    element = $compile(element)($rootScope);
  }));

  it('should add a class of omg', function() {
    expect(element.hasClass('omg')).toBe(true);
  });
});
