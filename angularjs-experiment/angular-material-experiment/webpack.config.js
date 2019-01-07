module.exports = {
  context: __dirname + '/src',
  entry: './index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0']
        }
      },
      { test: /\.html$/, loader: 'file?name=[name].[ext]' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
