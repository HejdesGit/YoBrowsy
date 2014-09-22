'use strict';

var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var jade = require('gulp-jade');
var watch = require('gulp-watch');
var notify = require("gulp-notify");
var plumber = require('gulp-plumber');

gulp.task('default', function () {
  return gulp.src('app/scss/app.scss')
    .pipe(plumber())
    .pipe(rubySass({
<<<<<<< HEAD
     // sourcemap: false,
     // sourcemapPath: '../scss',
      quiet: true,
      loadPath: 'app/bower_components/foundation/scss/',
      bundleExec: true
=======
      sourcemap: true,
      sourcemapPath: '../scss',
      quiet: true,
      loadPath: 'app/bower_components/foundation/scss/',
      bundleExec:true
>>>>>>> Hejde/master
    }))
    .on('error', function (err) {
      console.log(err.message);
    })
    .pipe(gulp.dest('.tmp/styles/'));
});

gulp.task('templates', function () {
  var currentDate = new Date();
  var currentTime =
    currentDate.getHours() + ":"
    + currentDate.getMinutes() + ":"
    + currentDate.getSeconds();
  var variables = {
    currentTime: currentTime
  };

  gulp.src('app/templates/index.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('app/'))
    .pipe(notify({
      message: variables.currentTime,
      title: "Jade generated!"
    }))
});

gulp.task('watch', function () {
  watch('app/templates/*.jade', function () {
    gulp.start('templates');
  });
});

gulp.task('watch2', function () {
  watch('app/scss/**/*.scss', function () {
    gulp.start('default');
  });
});
