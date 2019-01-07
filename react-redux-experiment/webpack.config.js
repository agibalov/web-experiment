module.exports = {
  entry: {
    'todo-app': './todo-app/index.js',
    'router-app': './router-app/index.js',
    'todo-app2': './todo-app2/index.js'
  },
  output: {
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/

        // this part now comes from .babelrc
        /*,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }*/
      },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
      { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot$/, loader: 'file' },
      { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  }
};
