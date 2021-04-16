const argv      = require('yargs').argv;
const config    = require('../../master.config.js');
const configApp = require('../../app.config.js');
const eslint    = require('gulp-eslint');
const gulp      = require('gulp');
const tools     = new (require('../../libraries/tools.js'));

gulp.task('eslint', function(done) {
  if (argv.skipESLint !== 'true') {
    tools.startTask('eslint');

    return gulp.src([config.assets + config.assetsSubpath + '/' + config.js.src + '/**/*.js', '!node_modules/**'])
      .pipe(eslint())
      .pipe(eslint.format())
      .pipe(eslint.failOnError())
      .pipe(tools.completeTask('eslint'))
  } else {
    return done();
  }
});
