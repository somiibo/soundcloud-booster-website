const config   = require('../../master.config.js');
const gulp     = require('gulp');
const newer    = require('gulp-newer');
const argv     = require('yargs').argv;

gulp.task('copyCss', function () {
  if (argv.skipCopyCss === 'true') {
    console.log('Skipping copyCss');
    return;
  }
  gulp.src([config.assets + config.assetsSubpath + '/sass/theme/**/*', '!./**/*.scss'])
    .pipe(newer(config.assets + '/css/theme'))
    .pipe(gulp.dest(config.assets + '/css/theme'));

  gulp.src([config.assets + config.assetsSubpath + '/sass/app/**/*', '!' + config.assets + config.assetsSubpath + '/sass/app/app.scss', '!./**/*.scss'])
    .pipe(newer(config.assets + '/css/app'))
    .pipe(gulp.dest(config.assets + '/css/app'));

  gulp.src([config.assets + config.assetsSubpath + '/sass/master/**/*', '!' + config.assets + config.assetsSubpath + '/sass/master/main.scss', '!./**/*.scss'])
    .pipe(newer(config.assets + '/css/master'))
    .pipe(gulp.dest(config.assets + '/css/master'));

});

gulp.task('copyImages', function () {

  gulp.src([config.assets + config.assetsSubpath + '/images/favicon/**/*'])
    .pipe(newer(config.assets + '/images/favicon'))
    .pipe(gulp.dest(config.assets + '/images/favicon'));

});

gulp.task('copyJs', function () {
  if (argv.skipCopyJs === 'true') {
    console.log('Skipping copyJs');
    return;
  }

  // gulp.src([config.assets + config.assetsSubpath + '/js/app/**/*', '!' + config.assets + config.assetsSubpath + '/js/app/app.js'])
  //   .pipe(newer(config.assets + '/js/app'))
  //   .pipe(gulp.dest(config.assets + '/js/app'));

  gulp.src([config.assets + config.assetsSubpath + '/js/theme/**/*'])
    .pipe(newer(config.assets + '/js/theme'))
    .pipe(gulp.dest(config.assets + '/js/theme'));

});

gulp.task('copyUncompiled', function () {
  if (argv.skipCopyUncompiled === 'true') {
    console.log('Skipping copyUncompiled');
    return;
  }
  gulp.src([config.assets + config.assetsSubpathUncompiled + '/**/*'])
    .pipe(newer(config.assets))
    .pipe(gulp.dest(config.assets));

});
