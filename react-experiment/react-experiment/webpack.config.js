const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx' ]
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 9000
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.template.html'
        })
    ]
};
