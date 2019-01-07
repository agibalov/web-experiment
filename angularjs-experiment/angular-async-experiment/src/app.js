angular.module('app', [])
.factory('co', ['$q', function($q) {
  return function(genFunc) {
    var deferred = $q.defer();

    var generator = genFunc();
    var loop = function(result) {
      var rv = generator.next(result);
      if(rv.done) {
        return deferred.resolve(rv.value);
      }
      var promise = rv.value;
      return promise.then(loop, deferred.reject);
    };

    loop();

    return deferred.promise;
  };
}])
.factory('add', ['$q', '$timeout', function($q, $timeout) {
  return function(a, b) {
    var deferred = $q.defer();
    $timeout(function() {
      deferred.resolve(a + b);
    }, 200);
    return deferred.promise;
  };
}])
.run(['co', 'add', function(co, add) {
  co(function* () {
    console.log('1 + 2 is', yield add(1, 2));
    console.log('2 + 3 is', yield add(2, 3));
    console.log('3 + 4 is', yield add(3, 4));
    return 123;
  }).then(function(r) {
    console.log('done', r);
  }, function(e) {
    console.log('error', e);
  });
}]);
