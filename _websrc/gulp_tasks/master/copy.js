const config   = require('../../master.config.js');
const gulp     = require('gulp');
const newer    = require('gulp-newer');

gulp.task('copyCss', function () {

  gulp.src([config.assets + config.assetsSubpath + '/sass/theme/**/*', '!./**/*.scss'])
    .pipe(newer(config.assets + '/css/theme'))
    .pipe(gulp.dest(config.assets + '/css/theme'));

  gulp.src([config.assets + config.assetsSubpath + '/sass/app/**/*', '!' + config.assets + config.assetsSubpath + '/sass/app/app.scss', '!./**/*.scss'])
    .pipe(newer(config.assets + '/css/app'))
    .pipe(gulp.dest(config.assets + '/css/app'));

});

gulp.task('copyImages', function () {

  gulp.src([config.assets + config.assetsSubpath + '/images/favicon/**/*'])
    .pipe(newer(config.assets + '/images/favicon'))
    .pipe(gulp.dest(config.assets + '/images/favicon'));

});

gulp.task('copyJs', function () {

  gulp.src([config.assets + config.assetsSubpath + '/js/master/service-workers/*'])
    .pipe(newer(config.assets + '/js/master/service-workers'))
    .pipe(gulp.dest(config.assets + '/js/master/service-workers'));

  gulp.src([config.assets + config.assetsSubpath + '/js/app/**/*', '!' + config.assets + config.assetsSubpath + '/js/app/app.js'])
    .pipe(newer(config.assets + '/js/app'))
    .pipe(gulp.dest(config.assets + '/js/app'));

  gulp.src([config.assets + config.assetsSubpath + '/js/theme/**/*'])
    .pipe(newer(config.assets + '/js/theme'))
    .pipe(gulp.dest(config.assets + '/js/theme'));

});
