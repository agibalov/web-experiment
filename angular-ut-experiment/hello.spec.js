describe("Hello world", function() {
  describe("dummy element", function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;
      element = angular.element("<div>{{2 + 3}}</div>");
      element = $compile(element)($rootScope);
    }));

    it("should equal 5", function() {
      $scope.$digest();
      expect(element.html()).toBe("5");
    });
  });

  describe("element with scope", function() {
    var element;
    var $scope;
    beforeEach(inject(function($compile, $rootScope) {
      $scope = $rootScope;
      element = angular.element("<div>Hello, {{name}}!</div>");
      element = $compile(element)($rootScope);
    }));

    it("should welcome me", function() {
      $scope.name = 'loki2302';
      $scope.$digest();
      expect(element.html()).toBe("Hello, loki2302!");
    });

    it("should update the welcome message, when name gets changed", function() {
      $scope.name = 'loki2302';
      $scope.$digest();
      expect(element.html()).toBe("Hello, loki2302!");

      $scope.name = 'Andrey';
      $scope.$digest();
      expect(element.html()).toBe("Hello, Andrey!");
    });
  });
});
