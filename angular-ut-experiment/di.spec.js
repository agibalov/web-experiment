describe('dependency injection', function() {
  describe('injector', function() {
    it('should let me retrieve itself', function() {    
      var $injector = angular.injector();
      expect($injector.get('$injector')).toBe($injector);
    });

    describe('should let me register a component and then retrieve it', function() {
      var $injector;
      beforeEach(function() {
        $injector = angular.injector([function($provide) {
          $provide.constant('message', 'hello world');
        }]);
      });

      it('explicitly', function() {
        var message = $injector.get('message');
        expect(message).toBe('hello world');
      });

      it('with callback', function() {
        $injector.invoke(function(message) {
          expect(message).toBe('hello world');
        });
      });

      it('with array annotations', function() {
        $injector.invoke(['message', function(x) {
          expect(x).toBe('hello world');          
        }]);
      });

      it('with annotated function', function() {
        function retrieveMessage(x) {
          expect(x).toBe('hello world');
        };
        retrieveMessage.$inject = ['message'];
        $injector.invoke(retrieveMessage);
      });
    });
  });  
});
