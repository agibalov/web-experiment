module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            './karma-shim.ts',
            //'./src/**/*.spec.ts'
        ],
        preprocessors: {
            './karma-shim.ts': ['webpack'],
            //'./src/**/*.spec.ts': ['webpack']
        },
        webpack: require('./webpack.test-config.js'),
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-webpack'
        ],
        browsers: ['Chrome'],
        singleRun: true,
        mime: {
            'text/x-typescript': ['ts']
        }
    });
};
