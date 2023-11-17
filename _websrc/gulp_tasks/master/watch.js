const config    = require('../../master.config.js');
const appConfig = require('../../app.config.js');
const gulp      = require('gulp');
const watch     = require('gulp-watch');

gulp.task('watch', async () => {
  if (config.tasks.imagemin) {
    watch(`${config.assets}${config.assetsSubpath}/${config.imagemin.src}/**/*`, () => {
      gulp.start('imagemin');
    });
  }

  if (config.tasks.sass) {
    watch(`${config.assets}${config.assetsSubpath}/${config.sass.src}/**/*`, () => {
      gulp.start('sass');
    });
  }

  if (appConfig.watch) {
    appConfig.watch(gulp, watch);
  }

  watch([
    `${config.assets}${config.assetsSubpath}/${config.js.src}/**/*`,
    `${config.assets}${config.assetsSubpath}/${config.sass.src}/**/*`,
    './special/**/*',
    // Trigger on service-worker changes
    './_websrc/templates/master/js/master-service-worker.js',
    // But don't trigger when service worker is copied
    '!./special/master/misc/master-service-worker.js'
  ], () => {
    gulp.start('copyJs');
    gulp.start('copyCss');
    gulp.start('jekyll-build');
  });

  watch([
    `${config.assets}${config.assetsSubpathUncompiled}/**/*`,
  ], () => {
    gulp.start('copyUncompiled');
    gulp.start('jekyll-build');
  });

  if (config.tasks.browsersync) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      `!${config.jekyll.dest}/**/*`,
      '_config*.yml',
      './**/*.html',
      './**/*.md',
      './**/*.markdown',
      './**/*.jekyll',
      './**/*.js',
      './**/*.json',
      `${config.jekyll.data}/**/*`,
      `${config.assets}/${config.sass.dest}/**/*`,
      `${config.assets}/${config.js.dest}/**/*`,
      `${config.assets}/${config.imagemin.dest}/**/*`,
    ], () => {
      gulp.start('browser-reload');
    });
  }

  return Promise.resolve();
});

