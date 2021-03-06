describe('directives', function() {
  describe('a directive that statically adds a class to an element', function() {
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('dummy', function() {
        return function(scope, element) {
          element.addClass('omg');
        };
      });
    }));

    it('should work', inject(function($rootScope, $compile) {
      var element = $compile('<div dummy></div>')($rootScope);
      expect(element.hasClass('omg')).toBe(true);
    }));
  });

  describe('a directive that decides what template to use based on attrs', function() {
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('dummy', function() {
        return {
          scope: {
            message: '='
          },
          template: function(element, attrs) {
            if(attrs.template === 'a') {
              return '<div>{{message}}</div>';
            } else if(attrs.template === 'b') {
              return '<p>{{message}}</p>';
            } else {
              throw new Error();
            }
          }
        };
      });
    }));

    var $scope;
    var $compile;
    beforeEach(inject(function($rootScope, _$compile_) {
      $scope = $rootScope.$new();
      $compile = _$compile_;
      $scope.message = 'hello there';
    }));

    it('should use the "div" template, when template is set to A', function() {
      var element = $compile('<dummy template="a" message="message"></div>')($scope);
      $scope.$digest();
      expect(element.find('div').length).toBe(1);
      expect(element.find('p').length).toBe(0);
      expect(element.find('div').text()).toBe('hello there');
    });

    it('should use the "p" template, when template is set to B', function() {
      var element = $compile('<dummy template="b" message="message"></div>')($scope);
      $scope.$digest();
      expect(element.find('div').length).toBe(0);
      expect(element.find('p').length).toBe(1);
      expect(element.find('p').text()).toBe('hello there');
    });
  });

  describe('a directive that just renders a template', function() {
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('person', function() {
        return {
          template: 'name: {{name}}, age: {{age}}'
        };
      });
    }));

    it('should work', inject(function($rootScope, $compile) {
      var element = $compile('<person/>')($rootScope);

      $rootScope.$digest();
      expect(element.html()).toBe('name: , age: ');

      $rootScope.name = 'loki2302';
      $rootScope.age = 40;
      $rootScope.$digest();
      expect(element.html()).toBe('name: loki2302, age: 40');
    }));
  });

  describe('a directive with an isolate scope', function() {
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('person', function() {
        return {
          restrict: 'E',
          scope: {
            personInfo: '=info'
          },
          template: 'name: {{personInfo.name}}, age: {{personInfo.age}}'
        };
      });
    }));

    it('should work', inject(function($rootScope, $compile) {
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
    }));
  });

  describe('a directive with attributes', function() {
    beforeEach(module(function($compileProvider) {
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
    }))

    it('should work', inject(function($rootScope, $compile) {
      var element = $compile(
        '<div>' +
        '<person id="p1" name="loki2302" age="40" />' +
        '<person id="p2" name="Andrey" age="30" />' +
        '</div>'
      )($rootScope);

      $rootScope.$digest();
      expect(element.find('#p1').text()).toBe('name: loki2302, age: 40');
      expect(element.find('#p2').text()).toBe('name: Andrey, age: 30');
    }));
  });

  describe('a custom ngClick directive', function() {
    beforeEach(module(function($compileProvider) {
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
    }));

    it('should work', inject(function($rootScope, $compile) {
      var element = $compile(
        '<button test-click="onClick()">hello<button>'
      )($rootScope);

      $rootScope.onClick = jasmine.createSpy('onClick');
      element.click();
      expect($rootScope.onClick).toHaveBeenCalled();
    }));
  });

  describe('a directive with callback binding', function() {
    beforeEach(module(function($compileProvider) {
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
    }));

    it('should work', inject(function($rootScope, $compile) {
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
    }));
  });

  describe('a directive with controller', function() {
    beforeEach(module(function($compileProvider) {
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
    }));

    var $rootScope;
    var $compile;
    beforeEach(inject(function(_$rootScope_, _$compile_) {
      $rootScope = _$rootScope_;
      $compile = _$compile_;
    }));

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
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('testTransclude', function() {
        return {
          restrict: 'E',
          transclude: true,
          template:
          '<div class="omg" ng-transclude>' +
          '</div>'
        };
      });
    }));

    it('should work', inject(function($rootScope, $compile) {
      var element = $compile(
        '<div class="outer">' +
        '  <test-transclude>hello there</test-transclude>' +
        '</div>')($rootScope);

      expect(element.find('.omg').text()).toBe('hello there');
    }));
  });

  describe('nested directives', function() {
    beforeEach(module(function($compileProvider) {
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
    }));

    it('should work', inject(function($rootScope, $compile) {
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
    }));
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
        expect($log.info.logs[0][0]).toBe('controller');
        expect($log.info.logs[1][0]).toBe('link');
      }));
    });

    describe('a single directive with controller and compile', function() {
      beforeEach(module(function($compileProvider) {
        $compileProvider.directive('test', function($log) {
          return {
            controller: function() {
              $log.info('controller');
            },
            compile: function(element, attrs, transclude) {
              return {
                pre: function(scope, element, attrs, controller) {
                  $log.info('pre-link');
                },
                post: function(scope, element, attrs, controller) {
                  $log.info('post-link');
                }
              };
            }
          };
        });
      }));

      it('should have calls in this order: controller, pre, post', inject(function($compile, $log) {
        $compile('<test></test>')({});
        expect($log.info.logs.length).toBe(3);
        expect($log.info.logs[0][0]).toBe('controller');
        expect($log.info.logs[1][0]).toBe('pre-link');
        expect($log.info.logs[2][0]).toBe('post-link');
      }));
    });

    describe('parent/child directives', function() {
      beforeEach(module(function($compileProvider) {
        makeDummyDirective('parent', $compileProvider);
        makeDummyDirective('child', $compileProvider);

        function makeDummyDirective(name, $compileProvider) {
          $compileProvider.directive(name, function($log) {
            return {
              controller: function() {
                $log.info(name + '-controller');
              },
              compile: function(element, attrs, transclude) {
                return {
                  pre: function(scope, element, attrs, controller) {
                    $log.info(name + '-pre-link');
                  },
                  post: function(scope, element, attrs, controller) {
                    $log.info(name + '-post-link');
                  }
                };
              }
            };
          });
        };
      }));

      it('should have a very specific sequence of calls', inject(function($log, $compile) {
        $compile('<parent><child></child></parent>')({});
        expect($log.info.logs.length).toBe(6);
        expect($log.info.logs[0][0]).toBe('parent-controller');
        expect($log.info.logs[1][0]).toBe('parent-pre-link');
        expect($log.info.logs[2][0]).toBe('child-controller');
        expect($log.info.logs[3][0]).toBe('child-pre-link');
        expect($log.info.logs[4][0]).toBe('child-post-link');
        expect($log.info.logs[5][0]).toBe('parent-post-link');
      }));
    });
  });

  describe("testing a directive's link() function", function() {
    beforeEach(module(function($compileProvider) {
      $compileProvider.directive('dummy', function() {
        return {
          scope: {
            a: '=',
            b: '='
          },
          link: function(scope) {
            scope.addNumbers = function() {
              return scope.a + scope.b;
            };
          }
        };
      });
    }));

    var $scope;
    var scope;
    var isolateScope;
    beforeEach(inject(function($rootScope, $compile) {
      $scope = $rootScope.$new();
      var element = $compile('<dummy a="myA" b="myB"></dummy>')($scope);
      //$rootScope.$digest();

      scope = element.scope();
      isolateScope = element.isolateScope();
    }));

    describe('scope', function() {
      it('should be the same as $scope', function() {
        expect(scope).toBe($scope);
        expect(scope).not.toBe(isolateScope);
      });
    });

    describe('isolateScope', function() {
      it('should not be the same as scope or $scope', function() {
        expect(isolateScope).not.toBe($scope);
        expect(isolateScope).not.toBe(scope);
      });

      it('should have addNumbers defined', function() {
        expect(isolateScope.addNumbers).toBeDefined();
      });
    });

    it('should add numbers when they are defined', function() {
      expect(isolateScope.a).not.toBeDefined();
      expect(isolateScope.b).not.toBeDefined();

      $scope.$apply(function() {
        $scope.myA = 2;
        $scope.myB = 3;
      });

      expect(isolateScope.a).toBeDefined();
      expect(isolateScope.b).toBeDefined();

      var result = isolateScope.addNumbers();
      expect(result).toBe(5);
    });
  });
});
