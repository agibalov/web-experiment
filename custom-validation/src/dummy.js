angular.module('loki2302', [])
.directive('dummy', function() {
  return {
    template: 'hello {{name}}!'
  };
});
