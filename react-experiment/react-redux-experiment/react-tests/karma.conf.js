module.exports = function(config) {
  config.set({
    basePath: './',
    files: [
      'test.jsx'
    ],
    preprocessors: {
      '*.jsx': ['webpack']
    },
    autowatch: true,
    frameworks: ['jasmine'],
    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack'
    ],
    webpack: {
      module: {
        loaders: [
          {
            test: /\.jsx$/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
          }
        ]
      }
    },
    browsers: ['Chrome']
  });
};
