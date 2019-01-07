describe('interpolate', function() {
  it('should let me interpolate a markup string', function() {
    var $injector = angular.injector(['ng']);
    var $interpolate = $injector.get('$interpolate');
    var welcomeFunc = $interpolate('Hello {{name|uppercase}}!');
    expect(welcomeFunc({ name: 'loki2302' })).toBe('Hello LOKI2302!');
  });
});