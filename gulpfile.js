var gulp = require('gulp');
var webpack = require('gulp-webpack');
var del = require('del');

gulp.task('clean', function() {
  return del(['dist/']);
});

gulp.task('copy', ['clean'], function() {
  return gulp.src('./src/index.html')
    .pipe(gulp.dest('dist/'));
});

gulp.task('webpack', ['copy'], function() {
  return gulp.src('./src/entry.js')
    .pipe(webpack({
      output: {
        filename: 'everything.js'
      },
      module: {
        loaders: [
          { test: /\.css$/, loader: 'style!css' },
          { test: /\.txt$/, loader: 'raw' },
          { test: /\.babel.js$/, loader: 'babel' }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack']);
