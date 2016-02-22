'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass');


gulp.task('sass', function () {
  return gulp.src('./css/src/*.scss')
    .pipe( sass() )
    .pipe(gulp.dest('./css'));
});
 
gulp.task('watch', function () {
  gulp.watch('./css/src/*.scss', ['sass']);
});