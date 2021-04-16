const config     = require('../../master.config.js');
const gulp       = require('gulp');
const newer      = require('gulp-newer');
const plumber    = require('gulp-plumber');
const responsive = require('gulp-responsive');
const cached     = require('gulp-cached');
const argv       = require('yargs').argv;
const sharp      = require('sharp');
const glob       = require('glob');
const jetpack    = require('fs-jetpack');
const tools      = new (require('../../libraries/tools.js'));

// const pngquant   = require('imagemin-pngquant');
// const imagemin   = require('gulp-imagemin');

// gulp.task('imagemin', function () {
//   return gulp.src([config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/**/*.svg', '!' + config.assets + config.assetsSubpath + '/' + config.imagemin.src + '/favicon/**/*'])
//     .pipe(plumber())
//     .pipe(newer(config.assets + '/' + config.imagemin.dest))
//     .pipe(imagemin({
//       progressive: config.imagemin.progressive,
//       svgoPlugins: config.imagemin.svgoPlugins,
//       use:         [pngquant()],
//     }))
//     .pipe(gulp.dest(config.assets + '/' + config.imagemin.dest));
// });

function getBlogImages() {
  return new Promise(function(resolve, reject) {
    let getDirectories = function (src, callback) {
      glob(src + '/**/*', callback);
    };

    getDirectories('assets/_src/images/blog/posts', function (err, res) {
      if (err) {
        console.log('Error', err);
      } else {
        return resolve(res);
      }
    });
  });
}

gulp.task('imageminResponsive', async function (done) {
  if (argv.skipImageMin === 'true') {
    console.log('Skipping imageminResponsive');
    return;
  }

  tools.startTask('imageminResponsive');
  
  console.log('Performing imageminResponsive');

  let images = await getBlogImages();
  const regex = /(\.jpg|\.jpeg|\.png)/img;

  for (var i = 0, l = images.length; i < l; i++) {
    const imgPath = images[i];
    const imgPathNew = imgPath.replace(regex, '-new$1');

    if (!imgPath.match(regex)) { continue }
    const newImage = await sharp(imgPath);
    const newImageMeta = await newImage.metadata();
    if (newImageMeta.width < 1024) {
      console.log('Fixing image', imgPath);
      jetpack.remove(imgPathNew);
      await newImage
        .resize({ width: 1024 })
        .toFile(imgPathNew)
      jetpack.remove(imgPath);
      jetpack.rename(imgPathNew, imgPath.split('/').pop())
    }
    // if (image && image.bitmap && image.bitmap.width < 1024) {
    //   console.log('Fixing image', imgPath);
    //   const ratio = (1024 / image.bitmap.width);
    //   await image.resize(Math.floor(image.bitmap.width * ratio), Math.floor(image.bitmap.height * ratio));
    //   // await image.quality(quality);
    //   await image.writeAsync(imgPath);
    // }
  }

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
    .pipe(gulp.dest(config.assets + '/' + config.imagemin.dest))
    .pipe(tools.completeTask('imageminResponsive'))
});
