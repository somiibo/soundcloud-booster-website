const gulp    = require('gulp');
const request = require('request');
const argv    = require('yargs').argv;
let fs;
let yaml;
const del = require('del');
const cmd  = require('node-cmd');

gulp.task('cloudflare:purge', async function (done) {
  yaml = yaml || require('js-yaml');
  fs = fs || require('fs-jetpack');
  let doc = yaml.safeLoad(fs.read('_config.yml'));
  console.log(`starting cloudflare:purge on zone: ${doc.cloudflare.zone} ...`);

  await new Promise(function(resolve, reject) {
    try {
      // Don't need to wait for this because there is a server-side delay to allow for the webiste to finish building before PURGE is called
      request.post(
        {
          url: 'https://api.itwcreativeworks.com/wrapper/cloudflare',
          body: {
            body: {
              purge_everything: true
            },
            zone: doc.cloudflare.zone,
            command: 'purge_cache',
            delay: parseInt(argv.delay) || 1,
          },
          timeout: parseInt(argv.timeout) || 30000,
          json: true,
        },
        function (err, httpResponse, body) {
          if (err) {
            console.error(err);
            resolve();
          } else {
            console.log(body);
            resolve();
          }

        }
      );
    } catch (e) {
      resolve();
    }
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
  await asyncCmd(`git checkout template && git fetch upstream && git pull upstream && git checkout master && git merge template -m "Merged from template." && git push origin`).then(data => {
    console.log(data)
  }).catch(err => {
    console.log('Error executing command:', err)
  })
});

gulp.task('template:setup', async function () {
  await asyncCmd(`git checkout master && git remote add upstream https://github.com/itw-creative-works/ultimate-jekyll.git && git remote set-url --push upstream no_push && git fetch upstream template && git merge upstream/template --allow-unrelated-histories -m "Merge from template."`).then(data => {
    console.log(data)
  }).catch(err => {
    console.log('Error executing command:', err)
  })
});

gulp.task('create:cert', async function () {
  await new Promise(function(resolve, reject) {
    let outputPath = '@output/.temp/certificate';

    fs = fs || require('fs-jetpack');
    let ips = argv.ips || '';
    if (!ips) {
      let browserSyncFile = (fs.read('@output/.temp/_config_browsersync.yml')) || '';
      browserSyncFile = browserSyncFile.replace('url: https://', '').split(':')[0];
      ips = [browserSyncFile];
    } else {
      ips = ips.split(',');
    }
    let certCnf = fs.read('_websrc/templates/master/output/certificate/localhost.conf');
    let stringBuilder = '';
    for (var i = 0; i < ips.length; i++) {
      stringBuilder = `${stringBuilder}IP.${i + 2}       = ${ips[i]}\n`
    }
    certCnf = certCnf.replace('{{IPS}}', stringBuilder);
    fs.write(`${outputPath}/localhost.conf`, certCnf);
    console.log(`Generatd conf file with IPs: ${ips}`);

    var exec = require('child_process').exec;
    var cmd = exec(`(echo US && echo CA && echo Los Angeles && echo _localhost_certificate && echo _localhost_certificate && echo localhost@localhost.com) | openssl req -config ${outputPath}/localhost.conf -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout ${outputPath}/localhost.key.pem -days 3650 -out ${outputPath}/localhost.cert.pem`, function (error, stdout, stderr) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
    });

    // COMMANDS
    // export OPENSSL_CONF=~/Documents/GitHub/ITW-Creative-Works/ultimate-jekyll/@output/.temp
    // openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout localhost.key -out localhost.crt -config cert-config.cnf -sha256
    // WOKRING: openssl req -config localhost.conf -new -x509 -sha256 -newkey rsa:2048 -nodes -keyout localhost.key.pem -days 365 -out localhost.cert.pem


    // const { spawn } = require('child_process');
    // const ls = spawn('openssl', ['req','-new','-sha256','-newkey','rsa:2048','-nodes','-keyout','dev.deliciousbrains.com.key','-x509','-days','365','-out','dev.deliciousbrains.com.crt']);
    //
    // ls.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    //   ls.stdin.write("US");
    // });
    // ls.stderr.on('data', (data) => {
    //   console.error(`stderr: ${data}`);
    //   ls.stdin.write("US");
    // });

    // var exec = require('child_process').exec;
    // var cmd = exec('openssl req -new -sha256 -newkey rsa:2048 -nodes -keyout dev.deliciousbrains.com.key -x509 -days 365 -out dev.deliciousbrains.com.crt', function (error, stdout, stderr) {
    //   // ...
    //   console.log(error);
    //   console.log(stdout);
    //   console.log(stderr);
    // });
    // cmd.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    //   cmd.stdin.write("US");
    // });
    // cmd.stderr.on('data', (data) => {
    //   console.error(`stderr: ${data}`);
    //   cmd.stdin.write("US");
    // });

    // var exec = require('child_process').exec;
    // console.log('GOT HERE');
    //
    // var cmd = exec('openssl req -new -sha256 -newkey rsa:2048 -nodes -keyout dev.deliciousbrains.com.key -x509 -days 365 -out dev.deliciousbrains.com.crt', function (error, stdout, stderr) {
    //     // ...
    //     console.log(error);
    //     console.log(stdout);
    //     console.log(stderr);
    //     resolve();
    // });
    //
    // cmd.stdout.on('data', (data) => {
    //   console.log(`stdout: ${data}`);
    // });
    // cmd.stdin.write("US");
    // // console.log(cmd);
    // // console.log(cmd.stdin);
  });
  // var cmd = exec('echo PENIS', function (error, stdout, stderr) {
  //     // ...
  // });


});






function asyncCmd(command) {
  return new Promise(function(resolve, reject) {
    cmd.get(command,
      function(err, data, stderr) {
        if (!err) {
          resolve(data);
        } else {
          reject(err)
        }
      }
    );
  });
}
