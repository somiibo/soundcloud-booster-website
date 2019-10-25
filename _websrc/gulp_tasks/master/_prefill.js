const gulp = require('gulp');
const cmd  = require('node-cmd');
const fs   = require('fs');
let config = require('../../master.config.js');
let isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;

gulp.task('_prefill', function (done) {
  // Fill required files if they don't exist AND we are not running via the template
  if (!isTemplate) {
    try {
      if (fs.existsSync(config.assets + config.assetsSubpath + '/sass/app/app.scss')) {
        //file exists
        done();
      } else {
         fs.writeFile(config.assets + config.assetsSubpath + '/sass/app/app.scss', '', function () {
           done();
         })
      }
    } catch(err) {
      console.error(err)
    }
  }

});
