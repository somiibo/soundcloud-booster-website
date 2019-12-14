const gulp = require('gulp');

gulp.task('cloudflare:purge', async function (done) {
  await new Promise(function(resolve, reject) {
    console.log('RAN', 'cloudflare:purge');
    resolve();
  });
});
