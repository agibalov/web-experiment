module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      './karma-shim.ts'
    ],
    preprocessors: {
      './karma-shim.ts': ['webpack']
    },
    webpack: require('./webpack.test-config.js'),
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],
    browsers: ['Chrome'],
    singleRun: true
  });
};
