module.exports = {
  entry: {
    'todo-app': './todo-app/index.js',
    'router-app': './router-app/index.js'
  },
  output: {
    filename: '[name].bundle.js'
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
