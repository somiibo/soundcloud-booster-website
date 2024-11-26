const argv        = require('yargs').argv;
const browsersync = require('browser-sync').create();
const fs          = require('fs-jetpack');
const gulp        = require('gulp');
const path        = require('path');
const tools       = new (require('../../libraries/tools.js'));
const Global      = require('../../libraries/global.js');

const config      = require('../../master.config.js');

const browser = (config.browsersync.browsers[0] != null) ? config.browsersync.browsers : 'default';
const urlType = 'external'; // local or external
let externalUrl;
let localUrl;
let workingUrl;

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browsersync', async () => {
  await tools.quitIfBadBuildEnvironment();

  // Wait for the prefill to be done
  await tools.poll(() => Global.get('prefillStatus') === 'done', { timeout: 120000 });

  // Check if the index.html file exists
  if (!fs.exists(`${config.jekyll.dest}/index.html`)) {
    fs.write(`${config.jekyll.dest}/index.html`, `<!doctype html> <html lang="en"> <head> <meta charset="utf-8"> <title>Initializing...</title> <meta name="description" content="Initializing..."> </head> <body> Initializing... <a href="#" onclick="window.location.href = window.location.href">refresh</a></body> </html>`)
  }

  // options: https://www.browsersync.io/docs/options
  // Start the Browsersync server
  let settings = {
    port: config.port,
    browser: browser,
    cors: true,
    server: {
      baseDir: config.jekyll.dest,
      middleware: async function (req, res, next) {
        const url = new URL(`http://localhost:4000${req.url}`);
        const pathname = url.pathname;

        // Set the query object
        req.query = {};
        req.body = {};

        // If the file has no ext, log it
        if (!path.extname(pathname)) {
          console.log(`[Browsersync] Serving ${pathname}`);
        }

        // Process the post request
        if (pathname.match(/\/_process/)) {
          const qsUrl = url.searchParams.get('url');
          let lib;

          // Set query
          url.searchParams.forEach((value, key) => {
            req.query[key] = value;
          })

          // Set body
          if (req.method === 'POST') {
            req.body = await receiveRequestBody(req);
          }

          // Try to load the library
          try {
            // Clear the cache
            delete require.cache[require.resolve(`../${qsUrl}`)];

            // Load the library
            lib = require(`../${qsUrl}`);
          } catch (e) {
            // Log the error
            console.error(`[Browsersync] Error processing ${qsUrl}`);

            // Set the status code
            res.statusCode = 500;

            // Return an error
            return res.write(`Cannot find ${qsUrl}`);
          }

          // Log
          console.log(`[Browsersync] Processing ${qsUrl}`);

          // const createPost = require('./create-post.js');
          // const post = new createPost();

          // return await post.create({
          //   req: req,
          //   res: res,
          // })
          return await lib({
            req: req,
            res: res,
          })
          .then((r) => {
            res.statusCode = 200;

            // Write the response (if it's JSON, set the content type)
            try {
              r = JSON.stringify(r);
              res.setHeader('Content-Type', 'application/json');
            } catch (e) {
            }

            // End the response
            res.write(r);
            res.end();
          })
          .catch((e) => {
            res.statusCode = 500;
            res.write(`Error processing ${qsUrl}: ${e}`);
            res.end();
          });
        }

        // Check if the URL is missing a trailing slash and does not have an extension
        if (!pathname.endsWith('/') && !path.extname(pathname)) {
          const newURL = `${pathname}.html`;
          // console.log(`[Browsersync] Rewriting ${pathname} to ${newURL}`);

          // Rewrite it to serve the .html extension
          req.url = newURL;
        }

        // Special case: Rewrite /blog/ to blog.html since Jekyll fucks it up locally
        if (pathname === '/blog/') {
          req.url = '/blog.html';
        }

        next();
      }
    },
    open: urlType,
    ghostMode: false,
    // open: false,
    // https: true, // some stuff fails if this is true (like service workers)
    // proxy: "https://mysite.dev",
  };
  if (argv.https) {
    if (!fs.exists('./@output/.temp/certificate/localhost.key.pem') || !fs.exists('./@output/.temp/certificate/localhost.cert.pem')) {
      setTimeout(function () {
        process.exit(1)
      }, 1);
      return reject(new Error('To run the site on HTTPS you first need to execute: npm run create:cert'));
    }
    settings.https = {
      key: './@output/.temp/certificate/localhost.key.pem',
      cert: './@output/.temp/certificate/localhost.cert.pem',
    }
  }

  browsersync.init(settings, async (error, instance) => {
    if (!error) {
      localUrl = instance.options.get('urls').get('local');
      externalUrl = instance.options.get('urls').get('external');
      workingUrl = (urlType === 'local') ? localUrl : externalUrl;
      fs.write('@output/.temp/_config_browsersync.yml', `url: ${workingUrl}`)
    } else {
      console.error('Browsersync error:', error);
    }

    // Launch ngrok if enabled
    if (!error && argv.ngrokOpen === 'true') {
      const ngrok = require('/usr/local/lib/node_modules/ngrok');
      const url = await ngrok.connect(instance.options.get('port'));
      console.log('\x1b[40m\x1b[35m');
      console.log('');
      console.log('');
      console.log('******* ngrok url *******');
      console.log(url);
      console.log('*************************');
      console.log('');
      console.log('\x1b[0m');
      fs.write('@output/ngrok/index.html', `<meta http-equiv="Refresh" content="0; url=${url}" />`)
      Global.set('browserSyncStatus', 'done');
      return Promise.resolve();
    } else {
      Global.set('browserSyncStatus', 'done');
      return Promise.resolve();
    }
  });
});

function receiveRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = [];

    req.on('data', function (chunk) {
      body.push(chunk.toString());
    });

    req.on('end', function () {
      body = body.join('');

      // Attempt to parse the body as JSON
      try {
        const parsedBody = JSON.parse(body);
        return resolve(parsedBody);
      } catch (error) {
        // If parsing fails, resolve with the original body string
        return resolve(body);
      }
    });

    req.on('error', function (err) {
      return reject(err);
    });
  });
}

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('browser-reload', ['jekyll-build'], async () => {
  await tools.quitIfBadBuildEnvironment();

  browsersync.notify('Rebuilt Jekyll');
  console.log(`Internal URL: ${localUrl}`);
  console.log(`External URL: ${externalUrl}`);
  browsersync.reload();

  return Promise.resolve();
});
