module.exports = {
  context: __dirname + '/src',
  entry: {
    'app': './index.js'
  },
  output: {
    filename: 'bundle.js',
    path: __dirname + '/build'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'stage-0'],
          plugins: ['transform-decorators-legacy']
        }
      },
      { test: /\.html$/, loader: 'raw' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
