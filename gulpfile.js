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
          { test: /\.babel.js$/, loader: 'babel' },
          { test: /\.woff$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
          { test: /\.woff2$/, loader: 'url?limit=10000&mimetype=application/font-woff2' },
          { test: /\.ttf$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
          { test: /\.eot$/, loader: 'file' },
          { test: /\.svg$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
        ]
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('default', ['webpack']);
