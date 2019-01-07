module.exports = {
    entry: './src/app.tsx',
    output: {
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts',
                exclude: /node_modules/
            }
        ]
    }
}
