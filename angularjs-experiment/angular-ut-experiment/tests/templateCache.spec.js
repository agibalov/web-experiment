describe('$templateCache', function() {
  it('should work', function() {    
    var $injector = angular.injector(['ng']);
    var $templateCache = $injector.get('$templateCache');
    
    $templateCache.put('1.html', 'contents for 1.html');
    expect($templateCache.get('1.html')).toBe('contents for 1.html');
    expect($templateCache.get('2.html')).toBeUndefined();
  });

  it('should let me put templates explicitly and then get them via ng-include', function() {
    var rootElement = angular.element('<div></div>');
    var $injector = angular.bootstrap(rootElement, []);
    var $compile = $injector.get('$compile');
    var $rootScope = $injector.get('$rootScope');    
    var $templateCache = $injector.get('$templateCache');


    $templateCache.put('1.html', 'contents for 1.html');
    
    var element = $compile(
      '<div>' + 
      '  <div ng-include="' + "'" + '1.html' + "'" + '"></div>' + 
      '</div>')($rootScope);

    $rootScope.$digest();

    expect(element.text()).toContain('contents for 1.html');
  });
});
