'use strict';
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssClean = require('gulp-clean-css');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var loadBrowser = require('browser-sync').create();

gulp.task('msg', function(){
  return console.log('Gulp is running...');
});
gulp.task('html', function() {
  gulp.src('src/*.html')
  .pipe(gulp.dest('httpdocs'));
});
gulp.task('sass', function(){
  gulp.src('src/assets/sass/*.scss')
  gulp.src('src/assets/sass/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('httpdocs/assets/css'));
});
//Minify CSS
gulp.task('clean', function(){
  gulp.src('httpdocs/assets/css/*.css')
  .pipe(cssClean())
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest('httpdocs/assets/css'));
});
gulp.task('image', function() {
  gulp.src('src/assets/img/*')
  .pipe(imagemin())
  .pipe(gulp.dest('httpdocs/assets/img'));
});
gulp.task('js', function() {
  gulp.src('src/assets/js/*.js')
  .pipe(gulp.dest('httpdocs/assets/js'));
});
gulp.task('build',
 ['html','sass','image','js',]
);
gulp.task('watch', function(){
  loadBrowser.init({
    watch: true,
    server: {
      baseDir: 'httpdocs',
      proxy: "localhost:3000"
    }
  });
  gulp.watch('src/*.html', ['html']);
  gulp.watch('src/assets/sass/*.scss', ['sass']);
  gulp.watch('src/assets/sass/**/*.scss', ['sass']);
  gulp.watch('src/assets/img/*', ['image']);
  gulp.watch('src/assets/js/*.js', ['js']);
});

gulp.task('default', ['watch']);
