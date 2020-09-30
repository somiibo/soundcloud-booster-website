const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../../master.config.js');
const fs          = require('fs-jetpack');
const gulp        = require('gulp');
let tools         = new (require('../../libraries/tools.js'));
let Global        = require('../../libraries/global.js');

let browser = (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default';

/**
 * Wait for jekyll-build, then launch the Server
 */
// gulp.task('browsersync', ['jekyll-build'], function () {
gulp.task('browsersync', async function () {
  return new Promise(async function(resolve, reject) {
    await tools.poll(function () {
      // console.log('browsersync polling Global.get(prefillStatus)....', Global.get('prefillStatus'), Global.get('jekyllBuild'));
      return Global.get('prefillStatus') === 'done';
    }, {timeout: 60000});

    if (!fs.exists(`${config.jekyll.dest}/index.html`)) {
      fs.write(`${config.jekyll.dest}/index.html`, `<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <title>Initializing...</title> <meta name="description" content="Initializing..."> </head> <body> Initializing... <a href="#" onclick="window.location.href = window.location.href">refresh</a></body> </html>`)
    }

    // options: https://www.browsersync.io/docs/options
    let settings = {
      port: config.port,
      browser: browser,
      cors: true,
      server: {
        baseDir: config.jekyll.dest,
        middleware: async function (req, res, next) {
          if (/_post.json/.test(req.url)) {
            const createPost = require('./create-post.js');
            let post = new createPost();
            return await post.create({
              req: req,
              res: res,
              test: {test: 'test'},
            })
            // res.write(JSON.stringify({test: 'penis'}));
            // return res.end();
          }
          next();
        }
      },
      open: 'external',
      ghostMode: false,
      // open: false,
      // https: true, // some stuff fails if this is true (like service workers)
      // proxy: "https://mysite.dev",
    };
    if (argv.https) {
      if (!fs.exists('./@output/.temp/certificate/localhost.key.pem') || !fs.exists('./@output/.temp/certificate/localhost.cert.pem')) {
        throw "To run the site on HTTPS you first need to execute: npm run create:cert";
      }
      settings.https = {
        key: "./@output/.temp/certificate/localhost.key.pem",
        cert: "./@output/.temp/certificate/localhost.cert.pem",
      }
    }
    browsersync.init(settings, function (error, instance) {
      // cmd.run(`mkdir -p @output/.temp/ && echo 'url: ${instance.options.get('urls').get('external')}' >@output/.temp/_config_browsersync.yml`);
      if (!error) {
        fs.write('@output/.temp/_config_browsersync.yml', `url: ${instance.options.get('urls').get('external')}`)
      } else {
        console.error('Browsersync error:', error);
      }

      // tools.poll(function () {
      //   var exists = fs.exists('./_site/index.html');
      //   if (exists) {
      //     browsersync.reload('/');
      //   }
      //   console.log('polling EXISTS', exists);
      //   return exists;
      // }, {timeout: 60000});

      // Launch ngrok if enabled
      if (!error && argv.ngrokOpen === 'true') {
        const ngrok = require('/usr/local/lib/node_modules/ngrok');
        (async function() {
          const url = await ngrok.connect(instance.options.get('port'));
          console.log('\x1b[40m\x1b[35m');
          console.log('');
          console.log('');
          console.log('******* ngrok url *******');
          console.log(url);
          console.log('*************************');
          console.log('');
          console.log('\x1b[0m');
          // cmd.run(`mkdir -p @output/ngrok/ && echo '<meta http-equiv="Refresh" content="0; url=${url}" />' >@output/ngrok/index.html`);
          fs.write('@output/ngrok/index.html', `<meta http-equiv="Refresh" content="0; url=${url}" />`)
          Global.set('browserSyncStatus', 'done');
          return resolve();
        })();
      } else {
        Global.set('browserSyncStatus', 'done');
        return resolve();
      }
    });
  });
});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('browser-reload', ['jekyll-build'], function () {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
});
