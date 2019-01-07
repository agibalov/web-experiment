describe('$q', function() {
  describe('all()', function() {
    it('should successfully resolve a promise when all child promises are resolved', inject(function($rootScope, $q) {
      var deferredA = $q.defer();
      var deferredB = $q.defer();

      var all = $q.all({
        a: deferredA.promise,
        b: deferredB.promise
      });

      var resolved;
      all.then(function(r) {
        resolved = r;
      });

      // 'all' is not resolved by default
      $rootScope.$apply();
      expect(resolved).toBeUndefined();

      // when 'a' is resolved, 'all' is yet not resolved
      deferredA.resolve('hello');
      $rootScope.$apply();
      expect(resolved).toBeUndefined();

      // when 'b' is resolved, 'all' gets resolved
      deferredB.resolve('there');
      $rootScope.$apply();
      expect(resolved).toEqual({
        a: 'hello',
        b: 'there'
      });
    }));

    it('omg', inject(function($rootScope, $q) {
      var deferredA = $q.defer();
      var deferredB = $q.defer();

      var all = $q.all({
        a: deferredA.promise,
        b: deferredB.promise
      });

      var error;
      all.catch(function(e) {
        error = e;
      });

      // 'all' is pending
      $rootScope.$apply();
      expect(error).toBeUndefined();

      // when 'a' is resolved, 'all' is still pending
      deferredA.resolve('hello');
      $rootScope.$apply();
      expect(error).toBeUndefined();

      // when 'b' is rejected, 'all' is rejected
      // and rejection reason is b's rejection reason
      deferredB.reject('ERROR!!!');
      $rootScope.$apply();
      expect(error).toBe('ERROR!!!');
    }));
  });

  describe('looping with promises', function() {
    var qWhile;
    beforeEach(inject(function($q) {
      // !!! ONLY WORKS WITHIN THE DIGEST !!!
      qWhile = function(conditionFunc, iterationFunc) {
        var deferred = $q.defer();

        var loop = function() {
          if(!conditionFunc()) {
            return deferred.resolve();
          }

          return $q.when(iterationFunc()).then(loop, deferred.reject);
        };

        loop();

        return deferred.promise;
      };
    }));

    it('should work in a positive case', function(done) {
      inject(function($rootScope) {
        var log = [];
        var i = 0;
        $rootScope.$apply(function() {
          qWhile(function() { return i < 5; }, function() {
            log.push(i);
            ++i;
          }).then(function() {
            expect(log).toEqual([0, 1, 2, 3, 4]);
            expect(i).toEqual(5);
            done();
          });
        });
      });
    });

    it('should work in a negative case', function(done) {
      inject(function($q, $rootScope) {
        var log = [];
        var i = 0;
        $rootScope.$apply(function() {
          qWhile(function() { return i < 5; }, function() {
            log.push(i);
            ++i;
            return $q.reject('omg');
          }).catch(function(e) {
            expect(e).toEqual('omg');
            expect(log).toEqual([0]);
            expect(i).toEqual(1);
            done();
          });
        });
      });
    });
  });
});
