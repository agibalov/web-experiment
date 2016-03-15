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
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      }
    ]
  }
};
