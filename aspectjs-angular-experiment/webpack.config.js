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
      {
        test: /\.ts$/,
        loader: 'babel?presets[]=es2015!ts',
        exclude: /node_modules/
      }
    ]
  }
}
