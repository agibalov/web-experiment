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
        '<div>'
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
        '<div>'
      )($rootScope);

      $rootScope.$digest();
      expect(element.find('#p1').text()).toBe('name: loki2302, age: 40');
      expect(element.find('#p2').text()).toBe('name: Andrey, age: 30');
    });
  });
});
