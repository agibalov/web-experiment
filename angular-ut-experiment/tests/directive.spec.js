describe('directives', function() {
  it('can have a directive that statically adds a class to an element', function() {
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

  describe('a directive that just renders a template', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('person', function() {
          return {
            template: 'name: {{name}}, age: {{age}}'
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile('<person/>')($rootScope);

      $rootScope.$digest();
      expect(element.html()).toBe('name: , age: ');

      $rootScope.name = 'loki2302';
      $rootScope.age = 40;
      $rootScope.$digest();
      expect(element.html()).toBe('name: loki2302, age: 40');
    });
  });

  describe('a directive with an isolate scope', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('person', function() {
          return {
            restrict: 'E',
            scope: {
              personInfo: '=info'
            },
            template: 'name: {{personInfo.name}}, age: {{personInfo.age}}'
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile(
        '<div>' + 
        '<person id="p1" info="loki2302"/>' + 
        '<person id="p2" info="andrey"/>' + 
        '</div>'
      )($rootScope);

      $rootScope.loki2302 = { name: 'loki2302', age: 40 };
      $rootScope.andrey = { name: 'Andrey', age: 30 };
      $rootScope.$digest();
      expect(element.find('#p1').text()).toBe('name: loki2302, age: 40');
      expect(element.find('#p2').text()).toBe('name: Andrey, age: 30');
    });
  });

  describe('a directive with attributes', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('person', function() {
          return {
            restrict: 'E',
            scope: {
              name: '@'
            },
            template: 'name: {{name}}, age: {{age}}',
            link: function(scope, element, attrs) {
              scope.age = attrs.age;
            }
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile(
        '<div>' + 
        '<person id="p1" name="loki2302" age="40" />' + 
        '<person id="p2" name="Andrey" age="30" />' + 
        '</div>'
      )($rootScope);

      $rootScope.$digest();
      expect(element.find('#p1').text()).toBe('name: loki2302, age: 40');
      expect(element.find('#p2').text()).toBe('name: Andrey, age: 30');
    });
  });

  describe('a custom ngClick directive', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('testClick', function($parse) {
          return {
            restrict: 'A',
            link: function(scope, element, attrs) {
              var clickCallbackFunc = $parse(attrs.testClick);
              element.on('click', function() {
                clickCallbackFunc(scope);
              });
            }
          }
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile(
        '<button test-click="onClick()">hello<button>'
      )($rootScope);

      $rootScope.onClick = jasmine.createSpy('onClick');
      element.click();
      expect($rootScope.onClick).toHaveBeenCalled();
    });
  });

  describe('a directive with callback binding', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('magicButton', function() {
          return {
            restrict: 'E',
            scope: {
              text: '@',
              onClick: '&'
            },
            template: '<button type="button">{{text}}</button>',
            link: function(scope, element) {
              element.on('click', function() {
                scope.onClick();
              });
            }
          }
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');
      var element = $compile(
        '<div>' + 
        '<magic-button text="hello" on-click="helloClick()"></magic-button>' + 
        '<magic-button text="there" on-click="thereClick()"></magic-button>' + 
        '</div>'
      )($rootScope);

      $rootScope.helloClick = jasmine.createSpy('helloClick');
      $rootScope.thereClick = jasmine.createSpy('thereClick');
      
      $rootScope.$digest();
      
      element.find('[text="hello"]').click();
      expect($rootScope.helloClick).toHaveBeenCalled();
      expect($rootScope.thereClick).not.toHaveBeenCalled();

      $rootScope.helloClick.calls.reset();
      element.find('[text="there"]').click();
      expect($rootScope.helloClick).not.toHaveBeenCalled();
      expect($rootScope.thereClick).toHaveBeenCalled();
    });
  });
});
