'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	concat = require('gulp-concat');


gulp.task('sass', function () {
  return gulp.src('./css/src/sass/320.scss')
    .pipe( sass('') )
    .pipe(gulp.dest('./css/src/css/'));
});

gulp.task('concat-css', function () {
  return gulp.src('./css/src/css/*.css')
    .pipe(concatCss('main.css'))
    .pipe(gulp.dest('css/'));
});

gulp.task('concat', function() {
  return gulp.src(['js/tmpl.js', 'js/data/*.js', 'js/src/*.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('js/'));
});
 
gulp.task('watch', function () {
  gulp.watch('./css/**/*.scss', ['sass']);
  gulp.watch('./css/src/css/*.css', ['concat-css']);
});