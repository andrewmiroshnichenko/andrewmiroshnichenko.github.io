'use strict';
 
var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var imagemin = require('gulp-imagemin');
var cleanCSS = require('gulp-clean-css');
var spritesmith = require('gulp.spritesmith');
var merge = require('merge-stream');

gulp.task('preprocessing', function () {
	return gulp.src('./css/sass/main.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(cleanCSS())
		.pipe(gulp.dest('./css'));
});

gulp.task('watch', function(){
	gulp.watch('./css/sass/**/*.scss', ['preprocessing']);
})

gulp.task('image-compression', function() {
	return gulp.src('img/src/**/*')
		.pipe(imagemin())
		.pipe(gulp.dest('img'));
});

gulp.task('spritesmith', function () {
	var spriteData = gulp.src('img/src/320/src/*.png').pipe(spritesmith({
		imgName: 'partners-sprite.png',
		cssName: 'partners-sprite.scss'
	}));

	var imgStream = spriteData.img
		.pipe(gulp.dest('img/src/320'));

	var cssStream = spriteData.css
		.pipe(gulp.dest('css/sass/components'));
	
	return merge(imgStream, cssStream);
});
		