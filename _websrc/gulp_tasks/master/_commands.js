const gulp    = require('gulp');
const fetch   = require('node-fetch');
const argv    = require('yargs').argv;
const del     = require('del');
const exec    = require('child_process').exec;
const fs      = require('fs-jetpack');
const yaml    = require('js-yaml');

gulp.task('cloudflare:purge', async function (done) {
  let doc = yaml.safeLoad(fs.read('_config.yml'));
  console.log(`starting cloudflare:purge on zone: ${doc.cloudflare.zone} ...`);

  await new Promise(function(resolve, reject) {
    // Don't need to wait for this because there is a server-side delay to allow for the webiste to finish building before PURGE is called
    fetch('https://api.itwcreativeworks.com/wrapper/cloudflare', {
      method: 'post',
      body: JSON.stringify({
        body: {
          purge_everything: true
        },
        zone: doc.cloudflare.zone,
        command: 'purge_cache',
        delay: parseInt(argv.delay) || 1,
      }),
      timeout: parseInt(argv.timeout) || 30000,
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      console.log(json);
      return resolve(json);
    })
    .catch(e => {
      console.error(err);
      return resolve(e);
    })
  });
});

gulp.task('clean:assets', async function (done) {
  await new Promise(async function(resolve, reject) {
    let deleted = await del(['assets/**/*', '!assets/_src', '!assets/_src-uncompiled', '_site']);
    console.log(`Deleted ${deleted.length} files.`);
    done();
  });
});

gulp.task('clean:npm', async function () {
  // console.log('\x1b[34m%s\x1b[0m', '******* finished clean:npm *******');  //cyan
});

gulp.task('template:update', async function () {
  await asyncCmd(`git checkout template && git fetch upstream && git pull upstream && git checkout master && git merge template -m "Merged from template." && git push origin`)
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log('Error executing command:', err)
  })
});

gulp.task('template:setup', async function () {
  await asyncCmd(`git checkout master && git remote add upstream https://github.com/itw-creative-works/ultimate-jekyll.git && git remote set-url --push upstream no_push && git fetch upstream template && git merge upstream/template --allow-unrelated-histories -m "Merge from template."`)
  .then(data => {
    console.log(data)
  })
  .catch(err => {
    console.log('Error executing command:', err)
  })
});

gulp.task('create:cert', async function () {
  await new Promise(async function(resolve, reject) {
    let outputPath = '@output/.temp/certificate';

    fs = fs || require('fs-jetpack');
    let ips = argv.ips || '';
    if (!ips) {
      let browserSyncFile = (fs.read('@output/.temp/_config_browsersync.yml')) || '';
      browserSyncFile = browserSyncFile.replace(/url: https?:\/\//, '').split(':')[0];
      ips = [browserSyncFile];
    } else {
      ips = ips.split(',');
    }

    if (ips[0] == '') {
      return reject('Please run the local server once before using this command. You can do this with: npm run start OR npm run prototype.')
    }

    let certCnf = fs.read('_websrc/templates/master/output/certificate/localhost.conf');
    let stringBuilder = '';
    for (var i = 0; i < ips.length; i++) {
      stringBuilder = `${stringBuilder}IP.${i + 2}       = ${ips[i]}\n`
    }
    certCnf = certCnf.replace('{{IPS}}', stringBuilder);
    fs.write(`${outputPath}/localhost.conf`, certCnf);
    console.log(`Generatd conf file with IPs: ${ips}`);

    await asyncCmd(`(echo US && echo CA && echo Los Angeles && echo _localhost_certificate && echo _localhost_certificate && echo localhost@localhost.com) | openssl req -config ${outputPath}/localhost.conf -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout ${outputPath}/localhost.key.pem -days 3650 -out ${outputPath}/localhost.cert.pem`)
    .then(function (result) {
      console.log('-----res', result);
      resolve(result);
    })
    .catch(function (e) {
      console.log('-----err', e);
      reject(e);
    });

  });


});

function asyncCmd(command) {
  return new Promise(function(resolve, reject) {
    var cmd = exec(command, function (error, stdout, stderr) {
      // if (error || stderr) {
      if (error) {
        reject(error || stderr);
      } else {
        resolve(stdout || stderr)
      }
    });
  });
}
