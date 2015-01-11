describe('timeout', function() {
  it('works', function(done) {
    var $injector = angular.injector(['ng']);
    var $timeout = $injector.get('$timeout');
    $timeout(function() {
      done();
    }, 1);
  });
});
