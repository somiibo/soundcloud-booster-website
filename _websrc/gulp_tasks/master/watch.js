const config        = require('../../master.config.js');
const appConfig        = require('../../app.config.js');
const gulp          = require('gulp');
const watch         = require('gulp-watch');

gulp.task('watch', function () {
  if (config.tasks.imagemin) {
    watch(config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/**/*', function () {
      gulp.start('imagemin');
    });
  }

  if (config.tasks.sass) {
    watch(config.assets + config.assetsSubpath + '/' + config.sass.src + '/**/*', function () {
      gulp.start('sass');
    });
  }

  appConfig.watch(gulp, watch);

  // Copying
  watch([
    config.assets + config.assetsSubpath + '/' + config.js.src + '/**/*',
    config.assets + config.assetsSubpath + '/' + config.sass.src + '/**/*',
    './special'+ '/**/*',
  ], function () {
    gulp.start('copyJs');
    gulp.start('copyCss');
    gulp.start('jekyll-build');
  });

  if (config.tasks.browsersync) {
    watch([
      '!./node_modules/**/*',
      '!./README.md',
      // '!./' + config.jekyll.dest + '/**/*',
      '!' + config.jekyll.dest + '/**/*',
      '_config*.yml',
      './**/*.html',
      './**/*.md',
      './**/*.markdown',
      config.jekyll.data + '/**/*',
      // config.assets + config.sass.dest + '/**/*',
      // config.assets + config.js.dest + '/**/*',
      // // config.assets + config.imagemin.dest + '/**/*',

      config.assets + '/' + config.sass.dest + '/**/*',
      config.assets + '/' + config.js.dest + '/**/*',
      config.assets + '/' + config.imagemin.dest + '/**/*',

      // '!./**/*.png',
      // '!./**/*.webp',
      // '!./**/*.jpg',
      // '!./**/*.jpeg',

    ], function () {
      gulp.start('browser-reload');
    });
  }

});
