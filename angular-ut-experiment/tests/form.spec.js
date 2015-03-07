describe('form', function() {
  var $scope;
  var $compile;

  beforeEach(inject(function($rootScope, _$compile_) {
    $scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  it('can be submitted', function() {
    var element = $compile(
    '<form name="f" ng-submit="handleForm()">' +
    ' <input type="text" ng-model="username" name="uname">' +
    ' <button type="submit">Submit</button>' +
    '</form>'
    )($scope);

    $scope.username = 'loki2302';
    $scope.handleForm = jasmine.createSpy('handleForm');
    
    $scope.$digest();
    element.children('button').click();

    expect($scope.handleForm).toHaveBeenCalled();
  });
});
