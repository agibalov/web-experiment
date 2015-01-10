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

    // TODO: illustrate how it differs from value
    describe('constant', function() {
      it('can be defined and retrieved', function() {
        var $injector = angular.injector([function($provide) {
          var x = $provide.constant('message', 'hello world');
          expect(x).toBeUndefined(); // wtf? docs say it should be the instance itself
        }]);

        expect($injector.get('message')).toBe('hello world');
      });
    });

    // TODO: illustrate how it differs from constant
    describe('value', function() {
      it('can be defined and retrieved', function() {
        var $injector = angular.injector([function($provide) {
          var valueProvider = $provide.value('message', 'hello world');
          expect(valueProvider.$get).toBeDefined();
        }]);

        expect($injector.get('message')).toBe('hello world');
      });
    });

    describe('factory', function() {
      it('can be defined with factory function', function() {
        function MessageService() {
          this.getMessage = function() { return 'hello world'; }
        };

        var $injector = angular.injector([function($provide) {
          var messageServiceProvider = $provide.factory('messageService', function() {
            return new MessageService();
          });
          expect(messageServiceProvider.$get).toBeDefined();
        }]);

        expect($injector.get('messageService').getMessage()).toBe('hello world');
      });
    });

    describe('service', function() {
      it('can be defined with constructor function', function() {
        function MessageService() {
          this.getMessage = function() { return 'hello world'; }
        };

        var $injector = angular.injector([function($provide) {
          var messageServiceProvider = $provide.service('messageService', MessageService);
          expect(messageServiceProvider.$get).toBeDefined();
        }]);

        expect($injector.get('messageService').getMessage()).toBe('hello world');
      });
    });

    describe('provider', function() {
      function MessageService(message) {
        this.getMessage = function() { return message; };
      };

      it('can be defined with an object with a $get function', function() {
        var $injector = angular.injector([function($provide) {
          var messageServiceProvider = $provide.provider('messageService', {
            $get: function(message) {
              return new MessageService(message);
            }
          });

          // it's actually a { $get: ... } object I just gave it ^^^
          expect(messageServiceProvider.$get).toBeDefined();

          $provide.constant('message', 'hello world');
        }]);

        var messageService = $injector.get('messageService');
        expect(messageService.getMessage()).toBe('hello world');
      });

      // TODO: define with constructor
      // TODO: what can I do with provider instance? (messageServiceProvider)
    });

    // TODO: "decorator"

    describe('composite test', function() {
      it('dummy', function() {
        // calculator->adder
        // calculator->formatter->suffix
        var $injector = angular.injector([function($provide) {
          $provide.service('calculator', function(adder, formatter) {
            this.add = function(a, b) {
              var result = adder.add(a, b);
              var resultString = formatter.format(a, b, result);
              return resultString;
            };
          });

          $provide.service('adder', function() {
            this.add = function(a, b) {
              return a + b;
            };
          });

          $provide.service('formatter', function(suffix) {
            this.format = function(a, b, result) {
              return a + ' and ' + b + ' is ' + result + suffix;
            };
          });

          $provide.constant('suffix', '!!!');
        }]);

        var calculator = $injector.get('calculator');
        expect(calculator.add(2, 3)).toBe('2 and 3 is 5!!!');
      });
    });
  });  
});
