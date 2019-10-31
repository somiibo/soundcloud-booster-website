const gulp = require('gulp');
const cmd  = require('node-cmd');
const fs   = require('fs');
let config = require('../../master.config.js');
let isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;

gulp.task("_prefill", async () => {
  await new Promise(async (resolve, reject) => {
    if (!isTemplate) {
      try {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/app.scss', '')
        await createFile('./_includes/app/global/foot.html', '<!-- App Foot Content  -->')
        await createFile('./_includes/app/global/foot.html', '<!-- App Head Content  -->')

        await createFile('./_includes/app/misc/ads.txt', '')
        await createFile('./_includes/app/misc/budget.json', '')
        await createFile('./_includes/app/misc/manifest.json', '')
        await createFile('./_includes/app/misc/robots.txt', '')
        await createFile('./pages/index.md',
          '---' + '\n' +
          '### ALL PAGES ###' + '\n' +
          'layout: master/global/default' + '\n' +
          'permalink: /' + '\n' +
          '' + '\n' +
          '### REGULAR PAGES ###' + '\n' +
          'meta:' + '\n' +
          '  title: "About"' + '\n' +
          '  description: "We are a great company and would love to design an intuitive solution for you!"' + '\n' +
          '  breadcrumb: "About"' + '\n' +
          '---' + '\n' +
          'This is a wonderful homepage!' +
          ''
        )
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
        await createFile('_websrc/gulp_tasks/app/main.js',
          "const gulp     = require('gulp');" + "\n" +
          "const newer    = require('gulp-newer');" + "\n" +
          "const through  = require('through2');" + "\n" +
          "" + "\n" +
          "gulp.task('sample', function() {" + "\n" +
            "  // write your first task here!" + "\n" +
            "  // then set up 'watch' tasks in the app.config.js" + "\n" +
          "});" + "\n" +
          ""
        )

        resolve();
      } catch (e) {
        reject(e)
      }
    } else {
      resolve();
    }

  });
});


async function createFile(file, contents) {
  return new Promise(function(resolve, reject) {
    try {
      if (fs.existsSync(file)) {
        resolve('Created: ' + file)
      } else {
         fs.writeFile(file, contents, function () {
           resolve('Created: ' + file)
         })
      }
    } catch (e) {
      reject('Failed to create: ' + file + ' ' + e)
    }
  });
}
