module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'everything.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  }
};
