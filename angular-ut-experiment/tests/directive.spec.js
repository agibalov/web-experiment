describe('dummy directive', function() {
  it('should work', function() {
    var $injector = angular.injector(['ng', function($compileProvider) {
      $compileProvider.directive('dummy', function() {
        return function(scope, element) {
          element.addClass('omg');
        };
      });
    }]);
    
    var $rootScope = $injector.get('$rootScope');
    var $compile = $injector.get('$compile');
    var element = $compile('<div dummy></div>')($rootScope);
    expect(element.hasClass('omg')).toBe(true);
  });
});
