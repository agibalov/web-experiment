var gulp = require('gulp');
var webpack = require('webpack-stream');
var del = require('del');

gulp.task('clean', function() {
  return del(['dist/']);
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', ['copy'], function() {
  return gulp.src('./src/index.js')
    .pipe(webpack({
      output: {
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
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack']);
