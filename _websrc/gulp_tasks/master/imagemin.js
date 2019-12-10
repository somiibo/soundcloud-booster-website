const config   = require('../../master.config.js');
const gulp     = require('gulp');
const imagemin = require('gulp-imagemin');
const newer    = require('gulp-newer');
const plumber  = require('gulp-plumber');
const pngquant = require('imagemin-pngquant');
const responsive = require('gulp-responsive');
const cached = require('gulp-cached');
const argv   = require('yargs').argv;

gulp.task('imagemin', function () {
  return gulp.src([config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/**/*.svg', '!' + config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/favicon/**/*'])
    .pipe(plumber())
    .pipe(newer(config.assets + '/' + config.imagemin.dest))
    .pipe(imagemin({
      progressive: config.imagemin.progressive,
      svgoPlugins: config.imagemin.svgoPlugins,
      use:         [pngquant()],
    }))
    .pipe(gulp.dest(config.assets + '/' + config.imagemin.dest));
});

gulp.task('imageminResponsive', function () {
  if (argv.skipImageMin == 'true') {
    console.log('Skipping imageminResponsive');
    return;
  }
  console.log('Performing imageminResponsive');
  return gulp.src([config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/**/*.{jpg,jpeg,png}', '!' + config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/favicon/**/*'])
    .pipe(cached('images'))
    .pipe(responsive({
      '**/*.{jpg,jpeg}': [
        {
          width: 320,
          rename: {
            suffix: '-320px',
            extname: '.jpg',
          },
        },
        {
          width: 640,
          rename: {
            suffix: '-640px',
            extname: '.jpg',
          },
        },
        {
          width: 1024,
          rename: {
            suffix: '-1024px',
            extname: '.jpg',
          },
        },
        {
          width: 320,
          rename: {
            suffix: '-320px',
            extname: '.webp',
          },
        },
        {
          width: 640,
          rename: {
            suffix: '-640px',
            extname: '.webp',
          },
        },
        {
          width: 1024,
          rename: {
            suffix: '-1024px',
            extname: '.webp',
          },
        },
        {
          rename: {
            suffix: '',
            extname: '.webp',
          },
        },
        {
          // Compress, strip metadata, and rename original image
          rename: { suffix: '' },
          // quality: 70,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // // Zlib compression level of PNG output format
          compressionLevel: 6,
          // // Strip all metadata
          withMetadata: false,
        }
      ],
      '**/*.png': [
        {
          width: 320,
          rename: {
            suffix: '-320px',
            extname: '.png',
          },
        },
        {
          width: 640,
          rename: {
            suffix: '-640px',
            extname: '.png',
          },
        },
        {
          width: 1024,
          rename: {
            suffix: '-1024px',
            extname: '.png',
          },
        },
        {
          width: 320,
          rename: {
            suffix: '-320px',
            extname: '.webp',
          },
        },
        {
          width: 640,
          rename: {
            suffix: '-640px',
            extname: '.webp',
          },
        },
        {
          width: 1024,
          rename: {
            suffix: '-1024px',
            extname: '.webp',
          },
        },
        {
          rename: {
            suffix: '',
            extname: '.webp',
          },
        },
        {
          // Compress, strip metadata, and rename original image
          rename: { suffix: '' },
          quality: 70,
          // Use progressive (interlace) scan for JPEG and PNG output
          progressive: true,
          // // Zlib compression level of PNG output format
          compressionLevel: 6,
          // // Strip all metadata
          withMetadata: false,
          skipOnEnlargement: true, // skip if output is smaller than input
        }
      ],

    },
    {
      errorOnUnusedConfig: false
    }))
    .pipe(gulp.dest(config.assets + '/' + config.imagemin.dest));
});
