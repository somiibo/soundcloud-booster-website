const gulp = require('gulp');
const cmd  = require('node-cmd');

gulp.task('template:update', async function () {
  await asyncCmd(`git checkout template && git fetch upstream && git pull upstream && git checkout master && git merge template -m "Merged from template." && git push origin`).then(data => {
    console.log(data)
  }).catch(err => {
    console.log('Error executing command:', err)
  })
});

gulp.task('template:setup', async function () {
  await asyncCmd(`git checkout master && git remote add upstream https://github.com/itw-creative-works/ultimate-jekyll.git && git remote set-url --push upstream no_push && git fetch upstream template && git merge upstream/template --allow-unrelated-histories -m "Merge from template."`).then(data => {
    console.log(data)
  }).catch(err => {
    console.log('Error executing command:', err)
  })
});

function asyncCmd(command) {
  return new Promise(function(resolve, reject) {
    cmd.get(command,
      function(err, data, stderr) {
        if (!err) {
          resolve(data);
        } else {
          reject(err)
        }
      }
    );
  });
}

// temp 1
