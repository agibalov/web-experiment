const gulp = require('gulp');
const rimraf = require('rimraf');
const sass = require('gulp-sass');
const connect = require('gulp-connect');

gulp.task('clean', () => {
    rimraf.sync('dist');
});

gulp.task('sass', () => {
    gulp.src('src/**/*.scss')
        .pipe(sass({
            output: 'expanded',
            importer: require('sass-module-importer')()
        }))
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('html', () => {
    gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'))
        .pipe(connect.reload());
});

gulp.task('watch', () => {
    gulp.watch('src/**/*.*', ['sass', 'html']);
});

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        livereload: true
    });
});

gulp.task('default', ['clean', 'sass', 'html', 'connect', 'watch']);
