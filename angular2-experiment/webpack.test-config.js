module.exports = {
  /*entry: './src/main.ts',
  output: {
    filename: 'bundle.js'
  },*/
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  module: {
    loaders: [
      {
        test: /\.ts$/,
        loader: 'ts',
        exclude: /node_modules/
      }
    ]
  }
}
