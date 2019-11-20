const gulp = require('gulp');
const cmd  = require('node-cmd');

gulp.task('lighthouse', async function () {
  await asyncCmd(`NOT DONE`).then(data => {
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
