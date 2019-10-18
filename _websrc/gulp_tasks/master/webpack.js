const argv           = require('yargs').argv;
const babel          = require('gulp-babel');
const config         = require('../../master.config.js')
const config_webpack = require('../../webpack.config.js')
const gulp           = require('gulp');
const named          = require('vinyl-named');
const plumber        = require('gulp-plumber');
const webpackStream  = require('webpack-stream');
const webpack        = require('webpack');

const entry = [];
for (var i = 0; i <= config.js.entry.length - 1; i++) {
  entry.push(config.assets + config.assetsSubpath + '/' + config.js.src + '/' + config.js.entry[i]);
}

if (config.tasks.eslint && argv.skipESLint != 'true') {
  config_webpack.module.rules.push(config.eslintLoader);
}

config_webpack.watch = argv.watch;
config_webpack.mode = argv.mode || config_webpack.mode;

gulp.task('webpack', function () {
  return gulp.src(entry)
    .pipe(plumber())
    .pipe(named())
    .pipe(babel(config.babel))
    .pipe(webpackStream(config_webpack, webpack))
    .pipe(gulp.dest(config.assets + '/' + config.js.dest));
});

// For internal use only
gulp.task('_webpack', function () {
  config_webpack.watch = config.tasks.watch;
  gulp.start('webpack');
});
