const gulp = require('gulp');
const cmd  = require('node-cmd');


gulp.task('template:update', async function () {
  cmd.run(`git checkout template && git fetch upstream && git pull upstream && git checkout master && git merge template -m "Merged from template." && git push origin`);
});

gulp.task('template:setup', async function () {
  cmd.run(`git checkout master && git remote add upstream https://github.com/itw-creative-works/ultimate-jekyll.git && git remote set-url --push upstream no_push && git fetch upstream template && git merge upstream/template --allow-unrelated-histories -m "Merge from template."`);
});
