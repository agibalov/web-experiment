module.exports = {
    entry: './src/main.ts',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.png$/, loader: 'url?limit=10000&mimetype=image/png' },
            { test: /\.gif$/, loader: 'url?limit=10000&mimetype=image/gif' },
            { test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
            { test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
            { test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
        ]
    }
}
