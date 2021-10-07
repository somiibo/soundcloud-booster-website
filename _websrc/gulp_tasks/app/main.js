const gulp     = require('gulp');
const newer    = require('gulp-newer');
const through  = require('through2');
const argv     = require('yargs').argv;
const fetch    = require('node-fetch');
const tools    = new (require('../../libraries/tools.js'));

gulp.task('sample', function() {
  // write your first task here!
  // then set up 'watch' tasks in the app.config.js
});
