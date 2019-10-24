const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const config      = require('../../master.config.js');
const cp          = require('child_process');
const cmd         = require('node-cmd');
const gulp        = require('gulp');

let browser = (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default';

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browsersync', ['jekyll-build'], function () {
  browsersync.init({
    port: config.port,
    browser: browser,
    server: {
      baseDir: config.jekyll.dest,
    }
  }, function (error, instance) {
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
      })();
    }
  });

});

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('browser-reload', ['jekyll-build'], function () {
  browsersync.notify('Rebuilded Jekyll');
  browsersync.reload();
});
