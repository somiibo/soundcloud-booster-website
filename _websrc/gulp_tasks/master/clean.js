const gulp     = require('gulp');
const del = require('del');

gulp.task('clean:assets', async function () {
  const deletedPaths = await del(['assets/**/*', '!assets/_src', '!assets/_src-uncompiled', '_site']);
});

gulp.task('clean:npm', async function () {
  // console.log('\x1b[34m%s\x1b[0m', '******* finished clean:npm *******');  //cyan
});
