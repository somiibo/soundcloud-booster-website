const autoprefixer = require('autoprefixer');
const config       = require('../../master.config.js');
const gulp         = require('gulp');
const postcss      = require('gulp-postcss');
const sass         = require('gulp-sass');
const es           = require('event-stream');
const tools        = new (require('../../libraries/tools.js'));
const Global       = require('../../libraries/global.js');

gulp.task('sass', async () => {
  const prePath = `${config.assets}${config.assetsSubpath}/${config.sass.src}`;

  tools.startTask('sass');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  return es.merge(
    gulp.src([`${prePath}/**/*.scss`, `!${prePath}/${config.sass.entry[0]}`])
      .pipe(sass({outputStyle: config.sass.outputStyle}).on('error', sass.logError))
      .pipe(postcss([
        autoprefixer({
          browsers: config.sass.autoprefixer.browsers
        })
      ]))
      .pipe(gulp.dest(`${config.assets}/${config.sass.dest}`)),

    gulp.src(`${prePath}/${config.sass.entry[0]}`)
      .pipe(sass({outputStyle: config.sass.outputStyle}).on('error', sass.logError))
      .pipe(postcss([
        autoprefixer({
          browsers: config.sass.autoprefixer.browsers
        })
      ]))
      .pipe(gulp.dest(`${config.assets}/${config.sass.dest}`)),
  )
  .pipe(tools.completeTask('sass'))
});

