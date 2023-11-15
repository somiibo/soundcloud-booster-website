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

let firstBuild = true;

function areTasksCompleted() {
  let completed = true;
  const tasks = Object.keys(Global.get(`completed`, {_faketask: new Date()}));
  for (var i = 0, l = tasks.length; i < l; i++) {
    const task = tasks[i];
    const time = Global.get(`completed.${task}`, new Date(0));
    const diff = new Date().getTime() - time.getTime();
    const waitTime = firstBuild ? 10000 : 1000;
    if (diff < waitTime) {
      completed = false;
      break;
    }
  }
  return completed;
}

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', async () => {
  // console.log('jekyll-build: precheck started', new Date());

  await tools.quitIfBadBuildEnvironment();

  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  // Other build tasks
  // This part takes a while...
  await tools.poll(() => areTasksCompleted(), { timeout: 1000 * 60 * 3 });

  await tools.poll(() => {
    return fs.exists('./assets/js/main.js') && fs.exists('./assets/css/main.css');
  }, {timeout: 1000 * 60 * 3});

  // console.log('jekyll-build: precheck complete', new Date());

  // Set firstBuild to false
  firstBuild = false;

  let jekyllConfig = config.jekyll.config.default;
  jekyllConfig += config.jekyll.config.app ? `,${config.jekyll.config.app}` : '';

  if (argv.jekyllEnv === 'production') {
    process.env.JEKYLL_ENV = 'production';
    jekyllConfig += config.jekyll.config.production ? `,${config.jekyll.config.production}` : '';
  } else {
    await tools.poll(() => {
      return Global.get('browserSyncStatus') === 'done';
    }, {timeout: 120000});
    jekyllConfig += config.jekyll.config.development ? `,${config.jekyll.config.development}` : '';
    jekyllConfig += ',' + '@output/.temp/_config_browsersync.yml';
  }

  jekyllConfig += tools.isTemplate ? `,_websrc/templates/master/_config_template.yml` : '';

  // Create build log JSON
  try {
    let buildJSON = JSON.parse(fs.read('@output/build/build.json'));
    buildJSON['npm-build'].timestamp_utc = now({offset: 0});
    buildJSON['npm-build'].timestamp_pst = now({offset: -7});

    let info = await getGitInfo();

    buildJSON['repo'].user = info.user;
    buildJSON['repo'].name = info.name;

    buildJSON['environment'] = argv.jekyllEnv === 'production' ? 'production' : 'development';

    buildJSON.packages['web-manager'] = require('web-manager/package.json').version;

    // Set _config.yml stuff
    buildJSON.brand = _configYml.brand;

    // Set custom admin dashboard pages
    buildJSON['admin-dashboard'] = JSON5.parse(_configYml['admin-dashboard']);

    fs.write('@output/build/build.json', JSON.stringify(buildJSON, null, 2));
  } catch (e) {
    console.error('Error updating build.json', e);
  }

  // Skip Jekyll Build
  if (argv.skipJekyll === 'true') {
    return Promise.resolve();
  }

  // Run Jekyll Build
  await tools.execute(`${jekyll} build --config ${jekyllConfig} --incremental`);

  // Jekyll post-build
  await postBuild();

  return Promise.resolve();
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

function postBuild() {
  return new Promise(function(resolve, reject) {
    // Move _site/blog/index.html to blog.html
    fs.move('_site/blog/index.html', '_site/blog.html');

    return resolve();
  });
}
