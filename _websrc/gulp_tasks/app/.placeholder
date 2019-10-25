const gulp     = require('gulp');
const newer    = require('gulp-newer');
const watch    = require('gulp-watch');
const through  = require('through2');

// Tasks
gulp.task('sample', function () {

  return gulp.src(['./appTask/src/**/*'])
    .pipe(newer('./appTask/dest'))
    .pipe(gulp.dest('./appTask/dest'));

});

// Edit watch locations in app.config.js!
