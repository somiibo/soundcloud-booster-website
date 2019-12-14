const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../../master.config.js');
const cp          = require('child_process');
const cmd         = require('node-cmd');
const gulp        = require('gulp');
let tools         = new (require('../../libraries/tools.js'));

let createPost;

let browser = (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default';

/**
 * Wait for jekyll-build, then launch the Server
 */
// gulp.task('browsersync', ['jekyll-build'], function () {
gulp.task('browsersync', async function () {
  return await new Promise(async function(resolve, reject) {

    await tools.poll(function () {
      return global._prefillStatus == 'done';
    }, {timeout: 60000});

    // options: https://www.browsersync.io/docs/options
    browsersync.init({
      port: config.port,
      browser: browser,
      server: {
        baseDir: config.jekyll.dest,
        middleware: async function (req, res, next) {
          if (/post\/create.json/.test(req.url)) {
            createPost = createPost || require('./create-post.js');
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
      // https: true, // some stuff fails if this is true (like service workers)
    }, function (error, instance) {
      cmd.run(`mkdir -p @output/.temp/ && echo 'url: ${instance.options.get('urls').get('external')}' >@output/.temp/_config_browsersync.yml`);

      // Launch ngrok if enabled
      if (!error && argv.ngrokOpen == 'true') {
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
          return resolve();
        })();
      } else {
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
