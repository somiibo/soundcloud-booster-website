const gulp     = require('gulp');

gulp.task('update', async function () {
  cmd.run(`git checkout template && git fetch upstream && git pull upstream && git checkout master && git merge template -m "Merged from template." && git push origin`);
});
