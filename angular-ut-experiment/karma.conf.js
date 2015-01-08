module.exports = function(config) {
  config.set({
    basePath: './',

    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'hello.spec.js',
      'controller.spec.js',
      'filter.spec.js'
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