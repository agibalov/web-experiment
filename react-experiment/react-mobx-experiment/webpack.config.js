const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: [".ts", ".tsx", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader"
                    }
                ]
            }
        ]
    },/*,
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    }*/
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ]
};
