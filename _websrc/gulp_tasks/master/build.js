const argv         = require('yargs').argv;
const config       = require('../../master.config.js');
const appGulpTasks = require('../../app.config.js');
const fs           = require('fs-jetpack');
const cp           = require('child_process');
const gulp         = require('gulp');
const tools        = new (require('../../libraries/tools.js'));
const JSON5        = require('json5');
const _configYml   = require('js-yaml').load(fs.read('_config.yml'));
const Global       = require('../../libraries/global.js');

config.tasks = Object.assign(config.tasks, appGulpTasks.tasks);

const jekyll = process.platform === 'win32' ? 'jekyll.bat' : 'jekyll';

const build  = Object.keys(config.tasks).filter((key) => config.tasks[key] && !['browsersync', 'watch'].includes(key))
build.push('jekyll-build');

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', async function (done) {
  return new Promise(async function(resolve, reject) {
    await tools.poll(function () {
      return Global.get('prefillStatus') === 'done';
    }, {timeout: 120000});

    let jekyllConfig = config.jekyll.config.default;
    jekyllConfig += config.jekyll.config.app ? ',' + config.jekyll.config.app : '';

    if (argv.jekyllEnv === 'production') {
      process.env.JEKYLL_ENV = 'production';
      jekyllConfig += config.jekyll.config.production ? ',' + config.jekyll.config.production : '';
    } else {
      await tools.poll(function () {
        return Global.get('browserSyncStatus') === 'done';
      }, {timeout: 120000});
      jekyllConfig += config.jekyll.config.development ? ',' + config.jekyll.config.development : '';
      jekyllConfig += ',' + '@output/.temp/_config_browsersync.yml';
    }

    // Create build log JSON
    try {
      let build = JSON.parse(fs.read('@output/build/build.json'));
      build['npm-build'].timestamp_utc = now({offset: 0});
      build['npm-build'].timestamp_pst = now({offset: -7});

      let info = await getGitInfo();

      build['repo'].user = info.user;
      build['repo'].name = info.name;

      build['environment'] = argv.jekyllEnv === 'production' ? 'production' : 'development';

      build.packages['web-manager'] = require('web-manager/package.json').version;

      // Set _config.yml stuff
      build.brand = _configYml.brand;

      // Set custom admin dashboard pages
      build['admin-dashboard-pages'] = JSON5.parse(_configYml['admin-dashboard-pages']);
      // build['admin-dashboard-pages'] = 'asd'

      fs.write('@output/build/build.json', JSON.stringify(build, null, 2));
    } catch (e) {
      console.error('Error updating build.json', e);
    }
    // console.log('----------build.json', fs.read('@output/build/build.json'));
    // console.log('----------list @output/build/', fs.list('@output/build/'));

    // Create CloudFlare Zone File
    // try {
    //   let doc = yaml.safeLoad(fs.read('_config.yml'));
    //   fs.write('@output/.temp/cloudflare-zone.txt', doc.cloudflare.zone);
    // } catch (e) {
    //   console.error('Error creating cloudflare-zone.txt', e);
    // }
    // console.log('----------cloudflare-zone.txt', fs.read('@output/.temp/cloudflare-zone.txt'));

    if (argv.buildLocation === 'server') {
      // Create CloudFlare Zone File
      // let doc = yaml.safeLoad(fs.read('_config.yml'));
      // cmd.run(`rm -rf @output/.temp && mkdir -p @output/.temp && echo '${doc.cloudflare.zone}' >@output/.temp/cloudflare-zone.txt`);

      // // Create build log JSON
      // cmd.run('' +
      // 'build_log_path="@output/templated/build.json"' + ' && ' +
      // 'sed "s/%TIMESTAMP_UTC_NPM%/' + now({offset: 0}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' + ' && ' +
      // 'sed "s/%TIMESTAMP_PST_NPM%/' + now({offset: -7}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' +
      // '');
      // cmd.run('' +
      // 'build_log_path="_websrc/templates/master/build/build.json"' + ' && ' +
      // 'build_log_path_dest="@output/build/build.json"' + ' && ' +
      // 'sed "s/%TIMESTAMP_UTC_NPM%/' + now({offset: 0}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' + ' && ' +
      // 'sed "s/%TIMESTAMP_PST_NPM%/' + now({offset: -7}) + '/g" $build_log_path > "$build_log_path"-temp && mv "$build_log_path"-temp $build_log_path' +
      // '');
    } else {
      // console.log('buildLocation =', 'local');
    }

    if (argv.skipJekyll === 'true') {
      // console.log('skipJekyll =', true);
      // return resolve(done());
      // return (done());
      // return done();
      return resolve();
    } else {
      // console.log('skipJekyll =', false);
      // return resolve(cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
      //   .on('close', done));
      // return (cp.spawn(jekyll, ['build', '--config', jekyllConfig], {stdio: 'inherit', env: process.env})
      //   .on('close', done));

      // return (cp.spawn(jekyll, ['build', '--config', jekyllConfig, '--incremental'], {stdio: 'inherit', env: process.env})
      //   .on('close', done));
      return (cp.spawn(jekyll, ['build', '--config', jekyllConfig, '--incremental'], {stdio: 'inherit', env: process.env})
        .on('close', resolve));
      // update 1
    }
  });
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


async function getGitInfo() {
  return new Promise(function(resolve, reject) {
    var exec = require('child_process').exec;
    var cmd = exec('git remote -v', function (error, stdout, stderr) {
    });
    cmd.stdout.on('data', (data) => {
      // console.log(`stdout: ${data}`);
      let info = data.match(/origin(.+)\(push\)/, '')[1].trim();
      var split = info.split('/')
      var length = split.length;
      var user = split[length - 2];
      var name = split[length - 1].replace('.git', '');
      resolve({user: user, name: name});
    });
    cmd.stderr.on('data', (data) => {
      // console.error(`stderr: ${data}`);
      reject(data);
    });
  });
}
