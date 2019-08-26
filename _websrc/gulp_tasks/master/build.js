const argv   = require('yargs').argv;
let config = require('../../master.config.js');
let appGulpTasks = require('../../app.config.js');
const cmd      = require('node-cmd');

config.tasks = Object.assign(config.tasks, appGulpTasks.tasks);

const cp     = require('child_process');
const gulp   = require('gulp');

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const build  = Object.keys(config.tasks).filter((key) => config.tasks[key] && !['browsersync', 'watch'].includes(key))
build.push('jekyll-build');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', function (done) {
  console.log('Command line args => ', argv);
  let jekyllConfig = config.jekyll.config.default;
  jekyllConfig += config.jekyll.config.app ? ',' + config.jekyll.config.app : '';

  if (argv.jekyllEnv == 'production') {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
  } else {
    jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
  }

  if (argv.buildLocation == 'server') {
    console.log('buildLocation =', 'server');
    var runCommand = '' +
    'build_log_path="@output/templated/build.json"' + ' && ' +
    'sed "s/%TIMESTAMP_UTC_NPM%/' + now({offset: 0}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' + ' && ' +
    'sed "s/%TIMESTAMP_PST_NPM%/' + now({offset: -7}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' +
    '';

    cmd.run(runCommand);
  } else {
    console.log('buildLocation =', 'local');
  }

  if (argv.skipJekyll == 'true') {
    console.log('skipJekyll =', true);
    return done();
  } else {
    console.log('skipJekyll =', false);
    return cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
      .on('close', done);
  }


});

/**
 * Build task, this will minify the images, compile the sass,
 * bundle the js, but not launch BrowserSync and watch files.
 */
gulp.task('build', build);

/**
 * Test task, this use the build task.
 */
gulp.task('test', build);


/**
 * Helper functions
 */
function now(options) {
    options = options || {};
    options.offset = options.offset || 0;

    var date = new Date();
    date.setHours(date.getHours() + options.offset);
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = (date.getMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + "T" + hours + ":" + minutes + ":" + seconds + "Z";

}
