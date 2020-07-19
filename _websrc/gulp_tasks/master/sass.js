const autoprefixer = require('autoprefixer');
const config       = require('../../master.config.js');
const gulp         = require('gulp');
const postcss      = require('gulp-postcss');
const sass         = require('gulp-sass');

gulp.task('sass', async function () {
  const prePath = config.assets + config.assetsSubpath + '/' + config.sass.src;

  await gulp.src([`${prePath}/**/*.scss`, `!${prePath}/${config.sass.entry[0]}`])
    .pipe(sass({outputStyle: config.sass.outputStyle}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: config.sass.autoprefixer.browsers
      })
    ]))
    .pipe(gulp.dest(`${config.assets}/${config.sass.dest}`));

  await gulp.src(`${prePath}/${config.sass.entry[0]}`)
    .pipe(sass({outputStyle: config.sass.outputStyle}).on('error', sass.logError))
    .pipe(postcss([
      autoprefixer({
        browsers: config.sass.autoprefixer.browsers
      })
    ]))
    .pipe(gulp.dest(`${config.assets}/${config.sass.dest}`));
});
