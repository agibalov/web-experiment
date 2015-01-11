module.exports = function(config) {
  config.set({
    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'di.spec.js',
      'scope.spec.js',
      'element.spec.js',
      'controller.spec.js',
      'filter.spec.js',
      'directive.spec.js',
      'service.spec.js'
    ],

    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine'
    ]
  });
};