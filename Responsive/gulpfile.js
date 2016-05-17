'use strict';
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concatCss = require('gulp-concat-css'),
	concat = require('gulp-concat'),
  autoprefixer = require('gulp-autoprefixer'),
  svgSprite = require('gulp-svg-sprite'),
  watch = require('gulp-watch'),
  plumber = require('gulp-plumber');

var svgSpriteConfig = {
  shape: {
    dimension: {
      maxHeight: 24,
      maxWidth: 24
    },
    // spacing: {
    //   padding: 10
    // },
  },
  svg: {
    rootAttributes: {
      fill: 'rgba(0, 255, 0, .5)'
    }
  },
  mode: {
    // dest: 'sass',
    css: {
      dest: '.',
      bust: false,
      prefix: '.social__item_%s',
      dimensions: false,
      common: 'uselessClass',
      layout: 'horizontal',
      render: {
        scss: true
      },
      sprite: '../../../img/socialsprite.svg'
    },
  }
};

gulp.task('svgsprite', function(){
  return gulp.src('./files/svg/*.svg')
    .pipe(svgSprite(svgSpriteConfig))
    .pipe(gulp.dest('./css/sass/components'));
});
 

gulp.task('sass', function() {
  return gulp.src('./css/sass/main.scss')
    .pipe(sass(({ includePaths : ['./css/sass/'] })))
    .pipe(autoprefixer())
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


// https://github.com/dlmanning/gulp-sass/issues/396 - gulp-sass unexpected crashing

// https://github.com/dlmanning/gulp-sass/issues/1 - problem solved(see comment  arnolali commented on 22 Jul 2015)
// To solve problem (Sublime Text + slow HDD) set Preferences > Settings - User > "atomic_save": true