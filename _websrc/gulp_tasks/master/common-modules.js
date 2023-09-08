const config   = require('../../master.config.js');
const gulp     = require('gulp');
const newer    = require('gulp-newer');
const argv     = require('yargs').argv;
const tools    = new (require('../../libraries/tools.js'));

gulp.task('copyFontAwesome', async () => {
  tools.startTask('copyFontAwesome');

  await tools.quitIfBadBuildEnvironment();

  return gulp.src('node_modules/@fortawesome/fontawesome-free/webfonts/*')
    .pipe(gulp.dest(`${config.assets}/webfonts`))
    .pipe(tools.completeTask('copyFontAwesome'))
});
