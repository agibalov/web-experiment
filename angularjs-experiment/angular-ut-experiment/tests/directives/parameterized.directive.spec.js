describe('Parameterized directive', function() {
  // THE FRAMEWORK MODULE
  beforeEach(module(function($provide) {
    $provide.constant('makeViewDirective', function(metadata) {
      if(!(metadata && metadata.entityName && metadata.template)) {
        throw new Error('Something is wrong with the metadata');
      }

      var scope = {};
      scope[metadata.entityName] = '=';

      return function() {
        return {
          restrict: 'E',
          template: metadata.template,
          scope: scope
        };
      };
    });
  }));

  // APP MODULE #1
  beforeEach(module(function($compileProvider, makeViewDirective) {
    $compileProvider.directive('personView', makeViewDirective({
      entityName: 'person',
      template: '<div class="person">{{person.name}}</div>'
    }));
  }));

  // APP MODULE #2
  beforeEach(module(function($compileProvider, makeViewDirective) {
    $compileProvider.directive('projectView', makeViewDirective({
      entityName: 'project',
      template: '<div class="project">{{project.codename}}</div>'
    }));
  }));

  var $scope;
  var element;
  beforeEach(inject(function($rootScope, $compile) {
    $scope = $rootScope.$new();
    element = $compile(
      '<div>' +
      '<person-view person="person"></person-view>' +
      '<project-view project="project"></project-view>' +
      '</div>')($scope);
  }));

  it('should work', function() {
    $scope.$apply(function() {
      $scope.person = { name: 'loki2302' };
      $scope.project = { codename: 'omg' };
    });

    expect(element.find('.person').text()).toBe('loki2302');
    expect(element.find('.project').text()).toBe('omg');
  });
});
