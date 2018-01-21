function makeWebpackConfig(root) {
    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');

    return {
        entry: path.resolve(root, 'app.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.js'
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.resolve(root, 'index.html')
            })
        ],
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [{
                        loader: 'style-loader'
                    }, {
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }]
                }
            ]
        }
    };
}

module.exports = makeWebpackConfig(`./src/${process.env.APPNAME}`);
