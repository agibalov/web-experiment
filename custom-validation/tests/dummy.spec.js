describe('loki2302.dummy', function() {
  var $scope;
  var $compile;

  beforeEach(module('loki2302'));

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('says "hello !" when there is no name', function() {
    var element = $compile('<dummy/>')($scope);

    $scope.$digest();
    expect(element.html()).toBe('hello !');
  });

  it('says "hello loki2302!" when name is set to loki2302', function() {
    var element = $compile('<dummy/>')($scope);

    $scope.name = 'loki2302';
    $scope.$digest();
    expect(element.html()).toBe('hello loki2302!');
  });

  it('updates the message when name is changed', function() {
    var element = $compile('<dummy/>')($scope);

    $scope.$digest();
    expect(element.html()).toBe('hello !');

    $scope.name = 'loki2302';
    $scope.$digest();
    expect(element.html()).toBe('hello loki2302!');
  });
});
