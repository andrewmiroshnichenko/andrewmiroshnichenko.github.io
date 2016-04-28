'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	concat = require('gulp-concat'),
  bourbon = require('node-bourbon');

gulp.task('bourbon', function() {
  return gulp.src('./css/sass/main.scss')
    // .pipe(bourbon.includePaths)
    .pipe(gulp.dest('./css/sass/'))
});

gulp.task('sass', function() {
  return gulp.src('./css/sass/main.scss')
    .pipe( sass('') )
    .pipe(gulp.dest('./css/'));
});

gulp.task('concat', function() {
  return gulp.src(['js/tmpl.js', 'js/data/*.js', 'js/src/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/'));
});
 
gulp.task('watch', function() {
  gulp.watch('./css/sass/**/*.scss', ['sass']);
});