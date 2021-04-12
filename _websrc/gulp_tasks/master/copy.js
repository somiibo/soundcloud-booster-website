const config   = require('../../master.config.js');
const gulp     = require('gulp');
const newer    = require('gulp-newer');
const argv     = require('yargs').argv;
const es       = require('event-stream');
const tools    = new (require('../../libraries/tools.js'));
const Global   = require('../../libraries/global.js');

gulp.task('copyCss', async function () {
  if (argv.skipCopyCss === 'true') {
    console.log('Skipping copyCss');
    return;
  }

  await tools.poll(function () {
    return Global.get('prefillStatus') === 'done';
  }, {timeout: 120000});

  return es.merge(
    gulp.src([config.assets + config.assetsSubpath + '/sass/theme/**/*', '!./**/*.scss'])
      .pipe(newer(config.assets + '/css/theme'))
      .pipe(gulp.dest(config.assets + '/css/theme')),

    gulp.src([config.assets + config.assetsSubpath + '/sass/app/**/*', '!' + config.assets + config.assetsSubpath + '/sass/app/app.scss', '!./**/*.scss'])
      .pipe(newer(config.assets + '/css/app'))
      .pipe(gulp.dest(config.assets + '/css/app')),

    gulp.src([config.assets + config.assetsSubpath + '/sass/master/**/*', '!' + config.assets + config.assetsSubpath + '/sass/master/main.scss', '!./**/*.scss'])
      .pipe(newer(config.assets + '/css/master'))
      .pipe(gulp.dest(config.assets + '/css/master')),
  )
});

gulp.task('copyImages', async function () {

  await tools.poll(function () {
    return Global.get('prefillStatus') === 'done';
  }, {timeout: 120000});

  return gulp.src([config.assets + config.assetsSubpath + '/images/favicon/**/*'])
    .pipe(newer(config.assets + '/images/favicon'))
    .pipe(gulp.dest(config.assets + '/images/favicon'));

});

gulp.task('copyJs', async function () {
  if (argv.skipCopyJs === 'true') {
    console.log('Skipping copyJs');
    return;
  }

  await tools.poll(function () {
    return Global.get('prefillStatus') === 'done';
  }, {timeout: 120000});

  // gulp.src([config.assets + config.assetsSubpath + '/js/app/**/*', '!' + config.assets + config.assetsSubpath + '/js/app/app.js'])
  //   .pipe(newer(config.assets + '/js/app'))
  //   .pipe(gulp.dest(config.assets + '/js/app'));

  return gulp.src([config.assets + config.assetsSubpath + '/js/theme/**/*'])
    .pipe(newer(config.assets + '/js/theme'))
    .pipe(gulp.dest(config.assets + '/js/theme'));

});

gulp.task('copyUncompiled', async function () {
  if (argv.skipCopyUncompiled === 'true') {
    console.log('Skipping copyUncompiled');
    return;
  }

  await tools.poll(function () {
    return Global.get('prefillStatus') === 'done';
  }, {timeout: 120000});

  return gulp.src([config.assets + config.assetsSubpathUncompiled + '/**/*'])
    .pipe(newer(config.assets))
    .pipe(gulp.dest(config.assets));

});
