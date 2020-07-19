const argv           = require('yargs').argv;
const babel          = require('gulp-babel');
const config         = require('../../master.config.js')
const config_webpack = require('../../webpack.config.js')
const gulp           = require('gulp');
const named          = require('vinyl-named');
const plumber        = require('gulp-plumber');
const webpackStream  = require('webpack-stream');
const webpack        = require('webpack');
const path           = require('path');
let tools            = new (require('../../libraries/tools.js'));
let Global           = require('../../libraries/global.js');

// const entry = [];
// for (var i = 0; i <= config.js.entry.length - 1; i++) {
//   entry.push(config.assets + config.assetsSubpath + '/' + config.js.src + '/' + config.js.entry[i]);
// }

if (config.tasks.eslint && argv.skipESLint != 'true') {
  config_webpack.module.rules.push(config.eslintLoader);
}

config_webpack.watch = argv.watch;
config_webpack.mode = argv.mode || config_webpack.mode;

gulp.task('webpack', async function () {
  const prePath = `${config.assets + config.assetsSubpath}/${config.js.src}`;
  await tools.poll(function () {
    return Global.get('prefillStatus') === 'done';
  }, {timeout: 60000});
  // await gulp.src([`${prePath}/**/*.js`, `!${prePath}/${config.js.entry[0]}`, `!${prePath}/app/service-worker.js`] )
  //   .pipe(plumber())
  //   .pipe(named())
  //   .pipe(babel(config.babel))
  //   .pipe(webpackStream(config_webpack, webpack))
  //   .pipe(gulp.dest(`${config.assets}/${config.js.dest}`));

  // await gulp.src([`${prePath}/${config.js.entry[0]}`] )
  //   .pipe(plumber())
  //   .pipe(named())
  //   .pipe(babel(config.babel))
  //   .pipe(webpackStream(config_webpack, webpack))
  //   .pipe(gulp.dest(`${config.assets}/${config.js.dest}`));

  await gulp.src([`${prePath}/**/*.js`, `!${prePath}/app/app.js`, `!${prePath}/app/service-worker.js`])
    .pipe(plumber())
    .pipe(named())
    .pipe(babel(config.babel))
    .pipe(webpackStream(config_webpack, webpack))
    .pipe(gulp.dest(`${config.assets}/${config.js.dest}`));

  // await gulp.src([`${prePath}/**/*.js`, `!${prePath}/app/app.js`, `!${prePath}/app/service-worker.js`])
  //   .pipe(plumber())
  //   .pipe(named())
  //   .pipe(babel(config.babel))
  //   .pipe(webpackStream(config_webpack, webpack))
  //   .pipe(gulp.dest(function (file) {
  //     const dir = file.dirname;
  //     let final = '';
  //     // if (file.basename.includes()) {
  //     //
  //     // }
  //     // console.log('=====> dirname', file.dirname);
  //     if (file.basename === 'test.js') {
  //       console.log('=====>');
  //       console.log('base', file.base);
  //       console.log('basename', file.basename);
  //       console.log('cwd', file.cwd);
  //       console.log('path', file.path);
  //       console.log('relative', file.relative);
  //       console.log('dirname', file.dirname);
  //       console.log('stem', file.stem);
  //     }
  //     return path.join(file.base, config.assets, config.js.dest);
  //   }));

});

// For internal use only
gulp.task('_webpack', function () {
  config_webpack.watch = config.tasks.watch;
  gulp.start('webpack');
});
