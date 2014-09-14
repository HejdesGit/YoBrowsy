'use strict';

var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var watch = require('gulp-watch');

gulp.task('default', function () {
  return gulp.src('app/scss/app.scss')
    .pipe(sass({
      sourcemap: true,
      sourcemapPath: '../scss',
      quiet: true,
      loadPath: 'app/bower_components/foundation/scss/'
    }))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('.tmp/styles/app.css'));
});

gulp.task('templates', function () {
  var YOUR_LOCALS = {};

  gulp.src('app/templates/index.jade')
    .pipe(jade({
      locals: YOUR_LOCALS, pretty: true
    }))
    .pipe(gulp.dest('app/'));
});

gulp.task('watch', function () {
  watch('app/templates/index.jade', function (files, cb) {
    gulp.start('templates', cb);
  });
});
