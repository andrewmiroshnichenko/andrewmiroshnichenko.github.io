'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
 
gulp.task('preprocessing', function () {
  return gulp.src('./css/sass/main.scss')
  	// .pipe(watch('./css/sass/**/*.scss'))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch('./css/sass/**/*.scss', ['preprocessing']);
	console.log(1);
})

// gulp.task('sass:watch', function () {
//   gulp.watch('./sass/**/*.scss', ['sass']);
// });