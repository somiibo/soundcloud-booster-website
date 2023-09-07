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
const tools          = new (require('../../libraries/tools.js'));
const Global         = require('../../libraries/global.js');

if (config.tasks.eslint && argv.skipESLint !== 'true') {
  config_webpack.module.rules.push(config.eslintLoader);
}

config_webpack.watch = argv.watch;
config_webpack.mode = argv.mode || config_webpack.mode;

gulp.task('webpack', async () => {
  const prePath = `${config.assets + config.assetsSubpath}/${config.js.src}`;

  tools.startTask('webpack');

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  return gulp.src([`${prePath}/**/*.js`, `!${prePath}/app/app.js`, `!${prePath}/app/service-worker.js`])
    .pipe(plumber())
    .pipe(named())
    .pipe(babel(config.babel))
    .pipe(webpackStream(config_webpack, webpack))
    .pipe(gulp.dest(`${config.assets}/${config.js.dest}`))
    .pipe(tools.completeTask('webpack'))
});

// For internal use only
gulp.task('_webpack', function () {
  config_webpack.watch = config.tasks.watch;
  gulp.start('webpack');
});
