const config   = require('../../master.config.js');
const gulp     = require('gulp');
const newer    = require('gulp-newer');
const argv     = require('yargs').argv;
const es       = require('event-stream');
const through  = require('through2');
const tools    = new (require('../../libraries/tools.js'));
const Global   = require('../../libraries/global.js');
const glob     = require('glob');
const fs       = require('fs-jetpack');

function doImagesExist(imgPath) {
  return new Promise(function(resolve, reject) {
    glob(imgPath, function (err, res) {
      if (err) {
        console.log('Error', err);
        return reject(err);
      } else {
        return resolve(res);
      }
    });
  });
}

// Copy CSS files
gulp.task('copyCss', async () => {
  if (argv.skipCopyCss === 'true') {
    console.log('Skipping copyCss');
    return Promise.resolve();
  }

  tools.startTask('copyCss');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  return es.merge(
    gulp.src([`${config.assets}${config.assetsSubpath}/sass/theme/**/*`, '!./**/*.scss'])
      .pipe(newer(`${config.assets}/css/theme`))
      .pipe(gulp.dest(`${config.assets}/css/theme`)),

    gulp.src([`${config.assets}${config.assetsSubpath}/sass/app/**/*`, `!${config.assets}${config.assetsSubpath}/sass/app/app.scss`, '!./**/*.scss'])
      .pipe(newer(`${config.assets}/css/app`))
      .pipe(gulp.dest(`${config.assets}/css/app`)),

    gulp.src([`${config.assets}${config.assetsSubpath}/sass/master/**/*`, `!${config.assets}${config.assetsSubpath}/sass/master/main.scss`, '!./**/*.scss'])
      .pipe(newer(`${config.assets}/css/master`))
      .pipe(gulp.dest(`${config.assets}/css/master`))
  )
  .pipe(tools.completeTask('copyCss'))
});

// Copy images
gulp.task('copyImages', async () => {
  const imgPath = `${config.assets}${config.assetsSubpath}/images/favicon/**/*`;
  const imgsExist = (await doImagesExist(imgPath)).length > 0;

  tools.startTask('copyImages');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  if (!imgsExist) {
    tools.completeTask('copyImages');

    return Promise.resolve();
  }

  return gulp.src([imgPath])
    .pipe(newer(`${config.assets}/images/favicon`))
    .pipe(gulp.dest(`${config.assets}/images/favicon`))
    .pipe(tools.completeTask('copyImages'))
});

// Copy JS files
gulp.task('copyJs', async () => {
  if (argv.skipCopyJs === 'true') {
    console.log('Skipping copyJs');
    return Promise.resolve();
  }

  tools.startTask('copyJs');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  // Create the master service worker
  const templateContent = await fs.read('./_websrc/templates/master/js/master-service-worker.js');
  const firebaseVersion = require('web-manager/package.json').dependencies.firebase.replace(/\^|~/img, '');
  await fs.writeAsync('./special/master/misc/master-service-worker.js', templateContent.replace(/{firebase-version}/img, firebaseVersion));

  return es.merge(
    gulp.src([`${config.assets}${config.assetsSubpath}/js/theme/**/*`])
      .pipe(newer(`${config.assets}/js/theme`))
      .pipe(gulp.dest(`${config.assets}/js/theme`)),

    gulp.src([`${config.assets}${config.assetsSubpath}/js/app/**/*`])
      .pipe(newer(`${config.assets}/js/app`))
      .pipe(gulp.dest(`${config.assets}/js/app`))
  )
  .pipe(tools.completeTask('copyJs'))
});

// Copy uncompiled assets
gulp.task('copyUncompiled', async () => {
  if (argv.skipCopyUncompiled === 'true') {
    console.log('Skipping copyUncompiled');
    return Promise.resolve();
  }

  tools.startTask('copyUncompiled');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  gulp.src([`${config.assets}${config.assetsSubpathUncompiled}/**/*`])
    .pipe(newer(`${config.assets}`))
    .pipe(gulp.dest(`${config.assets}`))
    .pipe(tools.completeTask('copyUncompiled'))
});
