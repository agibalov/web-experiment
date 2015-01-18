describe('$templateCache', function() {
  it('should work', function() {
    var $injector = angular.injector(['ng']);
    var $templateCache = $injector.get('$templateCache');
    $templateCache.put('1.html', 'contents for 1.html');
    expect($templateCache.get('1.html')).toBe('contents for 1.html');
    expect($templateCache.get('2.html')).toBeUndefined();
  });
});
