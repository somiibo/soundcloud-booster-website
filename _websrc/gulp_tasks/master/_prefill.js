const gulp     = require('gulp');
const cmd      = require('node-cmd');
const fs       = require('fs');
const argv     = require('yargs').argv;
let config     = require('../../master.config.js');
let isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;
let isServer   = (argv.buildLocation == 'server');

const GITIGNORE_EX_PLACEHOLDER =
  "*" + "\n" +
  "!.placeholder" + "\n" +
  "";

gulp.task("_prefill", async () => {
  await new Promise(async (resolve, reject) => {
    try {

      // all versions need these files to run properly
      {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/app.scss',
          "/*" + "\n" +
            "  assets/_src/sass/app/app.scss" + "\n" +
          "*/" + "\n" +
          "" + "\n" +
          "/*" + "\n" +
            "  CHARSET" + "\n" +
          "*/" + "\n" +
          "" + "\n" +
          '@charset "UTF-8";' + "\n" +
          "" + "\n" +
          "/*" + "\n" +
          "  IMPORTS" + "\n" +
          "*/" + "\n" +
          ""
        )
        await createFile('./_includes/app/global/foot.html', '<!-- App Foot Content  -->')
        await createFile('./_includes/app/global/head.html', '<!-- App Head Content  -->')

        await createFile('./_includes/app/misc/ads.txt', '')
        await createFile('./_includes/app/misc/budget.json', '')
        await createFile('./_includes/app/misc/manifest.json', '')
        await createFile('./_includes/app/misc/robots.txt', '')

        await createFile(config.assets + config.assetsSubpath + '/js/app/app.js',
          "Manager.ready(function() {" + "\n" +
            "  Manager.log('app.js fired Manager.ready()');" + "\n" +
            "" + "\n" +
            "  // Add additional logic here!" + "\n" +
            "  // var theme = require('../theme/theme.js');" + "\n" +
            "" + "\n" +
          "});" + "\n" +
          ""
        )
        if (!fs.existsSync('./pages/index.md') && !fs.existsSync('./pages/index.html')) {
          await createFile('./pages/index.md',
            '---' + '\n' +
            '### ALL PAGES ###' + '\n' +
            'layout: master/global/default' + '\n' +
            'permalink: /' + '\n' +
            '' + '\n' +
            '### REGULAR PAGES ###' + '\n' +
            'meta:' + '\n' +
            '  title: "Home"' + '\n' +
            '  description: "We are a great company and would love to design an intuitive solution for you!"' + '\n' +
            '  breadcrumb: "Home"' + '\n' +
            '---' + '\n' +
            'This is a wonderful homepage!' +
            ''
          )
        }

        await createFile(config.assets + config.assetsSubpath + '/js/app/service-workers/app-service-worker.js',
          "// app-service-worker.js code" + "\n" +
          "if (typeof log === 'undefined') {" + "\n" +
            "  var log = function() {};" + "\n" +
          "}" + "\n" +
          "log('app-service-worker.js loaded: ', self.location.pathname);" + "\n" +
          "" + "\n" +
          "// Note: any importScripts(); are relative to the master-service-worker.js location" + "\n" +
          "// importScripts('../../app/service-workers/app-service-worker.js');" + "\n" +
          ''
        )
        await createFile('_websrc/gulp_tasks/app/main.js',
          "const gulp     = require('gulp');" + "\n" +
          "const newer    = require('gulp-newer');" + "\n" +
          "const through  = require('through2');" + "\n" +
          "const argv     = require('yargs').argv;" + "\n" +
          "const request  = require('request');" + "\n" +
          "let isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;" + "\n" +
          "let isServer   = (argv.buildLocation == 'server');" + "\n" +
          "" + "\n" +
          "gulp.task('sample', function() {" + "\n" +
            "  // write your first task here!" + "\n" +
            "  // then set up 'watch' tasks in the app.config.js" + "\n" +
          "});" + "\n" +
          ""
        )

      }

      // only create these files if NOT on template
      if (!isTemplate) {


      }

      // only create these files if IS ON template OR server
      if (isTemplate && !isServer) {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/.gitignore', GITIGNORE_EX_PLACEHOLDER)
        await createFile(config.assets + config.assetsSubpath + '/js/app/.gitignore', GITIGNORE_EX_PLACEHOLDER)
        await createFile('./_includes/app/misc/.gitignore', GITIGNORE_EX_PLACEHOLDER)
        await createFile('./_includes/app/global/.gitignore', GITIGNORE_EX_PLACEHOLDER)
        await createFile('./_websrc/gulp_tasks/app/.gitignore', GITIGNORE_EX_PLACEHOLDER)
        await createFile('./pages/.gitignore', '/index.md'+'\n'+'.gitignore'+'\n')
      }
      resolve();
    } catch (e) {
      reject(e)
    }

  });
});


async function createFile(file, contents) {
  var response = {
    exists: false,
    error: null,
  }
  return new Promise(function(resolve, reject) {
    try {
      if (fs.existsSync(file)) {
        response.exists = true;
        resolve(response)
      } else {
         fs.writeFile(file, contents, function () {
           response.exists = false;
           resolve(response);
         })
      }
    } catch (e) {
      response.error = e;
      reject(response);
    }
  });
}
