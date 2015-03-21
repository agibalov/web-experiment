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

  describe('a directive with controller', function() {
    var $rootScope;
    var $compile;
    beforeEach(function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('searchBox', function() {
          return {
            restrict: 'E',
            scope: {
              onSearch: '&'
            },
            template: 
            '<div>' + 
            '<input type="text" ng-model="searchText">' +
            '<button type="button" ng-click="searchClick()">Search</button>' +
            '</div>',
            controller: function($scope) {
              $scope.searchText = "";
              $scope.searchClick = function() {
                var shouldResetSearchText = $scope.onSearch({
                  // "text" is what the consumer should use in HTML, see below
                  text: $scope.searchText
                });

                if(!!shouldResetSearchText) {
                  $scope.searchText = "";
                }
              };
            }
          };
        });
      }]);

      $rootScope = $injector.get('$rootScope');
      $compile = $injector.get('$compile');      
    });

    it('should work in basic use case', function() {
      var element = $compile(
        // The name "text" comes from the directive, see a call to $scope.onSearch() above
        '<search-box on-search="handleSearch(text)" />'
      )($rootScope);

      var searchTextElement = element.find('input');
      var searchButtonElement = element.find('button');

      $rootScope.$digest();      

      $rootScope.handleSearch = jasmine.createSpy('handleSearch').and.returnValue(true);

      searchTextElement.val('hello');
      searchTextElement.change();

      searchButtonElement.click();

      expect($rootScope.handleSearch).toHaveBeenCalledWith('hello');

      expect(searchTextElement.val()).toBe('');
    });

    it('should not crash when I do not specify an on-search handler', function() {
      var element = $compile(
        // because there no search handler to return 'true', 
        // the directive will never reset its search text
        '<search-box />'
      )($rootScope);

      var searchTextElement = element.find('input');
      var searchButtonElement = element.find('button');

      $rootScope.$digest();

      searchTextElement.val('hello');
      searchTextElement.change();

      searchButtonElement.click();

      expect(searchTextElement.val()).toBe('hello');
    });
  });

  describe('a directive with transclusion', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider.directive('testTransclude', function() {
          return {
            restrict: 'E',
            transclude: true,
            template: 
            '<div class="omg" ng-transclude>' +
            '</div>'
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');

      var element = $compile(
        '<div class="outer">' + 
        '  <test-transclude>hello there</test-transclude>' +
        '</div>')($rootScope);

      expect(element.find('.omg').text()).toBe('hello there');
    });
  });

  describe('nested directives', function() {
    it('should work', function() {
      var $injector = angular.injector(['ng', function($compileProvider) {
        $compileProvider
        .directive('testList', function() {
          return {
            restrict: 'E',
            transclude: true,
            scope: {},
            controller: function($scope) {              
              $scope.items = [];

              this.addItem = function(item) {
                $scope.items.push(item);
                item.selected = false;
              };

              $scope.select = function(item) {
                angular.forEach($scope.items, function(it) {
                  it.selected = false;
                });

                item.selected = true;
              };
            },
            template: 
            '<div>' + 
            '  <ul>' +
            '    <li ng-repeat="item in items" ng-click="select(item)">{{item.title}}</li>' +
            '  </ul>' + 
            '  <ng-transclude />' +
            '</div>'
          };
        })
        .directive('testItem', function() {
          return {
            require: '^testList',
            restrict: 'E',
            transclude: true,
            scope: {
              title: '@'
            },
            link: function(scope, element, attrs, itemsController) {              
              itemsController.addItem(scope);
            },
            template: '<div ng-show="selected">{{title}}: <ng-transclude></ng-transclude></div>'
          };
        });
      }]);

      var $rootScope = $injector.get('$rootScope');
      var $compile = $injector.get('$compile');

      var element = $compile(
        '<test-list>' + 
        '  <test-item title="item1">Hi there</test-item>' +
        '  <test-item title="item2">Bye there</test-item>' +
        '</test-list>')($rootScope);

      $rootScope.$digest();

      var item1Li = element.find('li:nth-child(1)');
      var item2Li = element.find('li:nth-child(2)');
      var item1View = element.find('test-item[title="item1"] div');
      var item2View = element.find('test-item[title="item2"] div');
      
      expect(item1Li.text()).toContain('item1');
      expect(item2Li.text()).toContain('item2');

      expect(item1View.text()).toBe('item1: Hi there');
      expect(item2View.text()).toBe('item2: Bye there');

      item1Li.click();
      expect(item1View.attr('class')).not.toContain('ng-hide');
      expect(item2View.attr('class')).toContain('ng-hide');

      item2Li.click();
      expect(item1View.attr('class')).toContain('ng-hide');
      expect(item2View.attr('class')).not.toContain('ng-hide');
    });
  });

  describe('method call order', function() {
    describe('a single directive with controller and link', function() {      
      beforeEach(module(function($compileProvider) {
        $compileProvider.directive('test', function($log) {
          return {
            controller: function() {
              $log.info('controller');
            },
            link: function() {
              $log.info('link');
            }
          };
        });
      }));

      it('should have its controller called before link', inject(function($compile, $log) {
        $compile('<test></test>')({});
        expect($log.info.logs.length).toBe(2);
      }));
    });
  });
});
