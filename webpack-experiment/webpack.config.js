var webpack = require('webpack');
var argv = require('yargs').demandOption(['myversion', 'myenv']).argv;

var plugins = [ new webpack.DefinePlugin({
    'process.env': JSON.stringify({
        THE_VERSION: argv.myversion,
        ENV: argv.myenv,
        BUILD_TIME: new Date().toISOString()
    })
}) ];

if(argv.myenv === 'prod') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: './src/main.ts',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'babel?presets[]=es2015!ts',
                exclude: /node_modules/
            }
        ]
    },
    plugins: plugins
};
