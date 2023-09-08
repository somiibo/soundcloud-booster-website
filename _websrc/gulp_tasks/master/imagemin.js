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

function getBlogImages() {
  return new Promise(function(resolve, reject) {
    let getDirectories = function (src, callback) {
      glob(src + '/**/*', callback);
    };

    getDirectories('assets/_src/images/blog/posts', function (err, res) {
      if (err) {
        tools.error('Could not getBlogImages', err);
      } else {
        return resolve(res);
      }
    });
  });
}

gulp.task('imageminResponsive', async () => {
  if (argv.skipImageMin === 'true') {
    console.log('Skipping imageminResponsive');
    return Promise.resolve();
  }

  tools.startTask('imageminResponsive');

  await tools.quitIfBadBuildEnvironment();

  let images = await getBlogImages();
  const regex = /(\.jpg|\.jpeg|\.png)/img;

  tools.log('Fixing undersized images...');

  // Fix undersized images
  for (var i = 0, l = images.length; i < l; i++) {
    const imgPath = images[i];
    const imgPathNew = imgPath.replace(regex, '-new$1');

    if (!imgPath.match(regex)) { continue }

    const newImage = sharp(imgPath)

    await newImage.metadata()
    .then(async (newImageMeta) => {

      if (newImageMeta.width < 1024) {
        tools.log('Fixing image', imgPath);
        jetpack.remove(imgPathNew);
        await newImage
          .resize({ width: 1024 })
          .toFile(imgPathNew)
          .then(() => {
            jetpack.remove(imgPath);
            jetpack.rename(imgPathNew, imgPath.split('/').pop())
          })
          .catch(e => {
            tools.error('Failed to fix image (resize)', imgPath, e);
          })
      }
    })
    .catch(e => {
      tools.error('Failed to fix image (meta)', imgPath, e);
    })
  }

  tools.log('Finished fixing undersized images');

  const imageminGlobs = [`!${config.assets}${config.assetsSubpath}/${config.imagemin.src}/favicon/**/*`]
  if (argv.imageMinPostId) {
    imageminGlobs.unshift(`${config.assets}${config.assetsSubpath}/${config.imagemin.src}/blog/posts/post-${argv.imageMinPostId}/*.{jpg,jpeg,png}`)
  } else {
    imageminGlobs.unshift(`${config.assets}${config.assetsSubpath}/${config.imagemin.src}/**/*.{jpg,jpeg,png}`)
  }

  return gulp.src(imageminGlobs)
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
    .pipe(gulp.dest(`${config.assets}/${config.imagemin.dest}`))
    .pipe(tools.completeTask('imageminResponsive'))
});
