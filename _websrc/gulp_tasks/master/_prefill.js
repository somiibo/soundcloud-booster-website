const gulp       = require('gulp');
const fs         = require('fs-jetpack');
const config     = require('../../master.config.js');
const _configYml = require('js-yaml').load(fs.read('_config.yml'));
const del        = require('del');
const tools      = new (require('../../libraries/tools.js'));
const Global     = require('../../libraries/global.js');
const fetch      = require('node-fetch');

gulp.task('_prefill', async () => {
  return new Promise(async (resolve, reject) => {

    const gitignore_ph = await readFile('./_websrc/templates/master/gitignore/all');
    const build_json = await readFile('./_websrc/templates/master/output/build/build.json');
    try {

      await del(['assets/js', 'assets/css'])
        .then(deleted => {
          console.log(`Deleted ${deleted.length} files.`);
        })

      // all versions need these files to run properly
      {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/app.scss',
          "/*" + "\n" +
            "  assets/_src/sass/app/app.scss" + "\n" +
          "*/" + "\n" +
          "" + "\n" +
          "/*" + "\n" +
            "  CHARSET" + "\n" +
          "*/" + "\n" +
          "" + "\n" +
          '@charset "UTF-8";' + "\n" +
          "" + "\n" +
          "/*" + "\n" +
          "  IMPORTS" + "\n" +
          "*/" + "\n" +
          ""
        )
        await createFile('./_includes/app/global/head.html', '<!-- App Head Content -->');
        await createFile('./_includes/app/global/head-pre-bundle.html', '<!-- App Head Content (pre-bundle) -->');

        await createFile('./_includes/app/global/foot.html', '<!-- App Foot Content -->');
        await createFile('./_includes/app/global/foot-pre-bundle.html', '<!-- App Foot Content (pre-bundle) -->');

        await createFile(`./_includes/app/elements/header.html`, '<!-- App Header Content -->');
        await createFile(`./_includes/app/elements/footer.html`, '<!-- App Footer Content -->');

        await createFile('./_includes/app/misc/ads.txt', '');
        await createFile('./_includes/app/misc/budget.json', '');
        await createFile('./_includes/app/misc/manifest.json', '');
        await createFile('./_includes/app/misc/robots.txt', '');

        await createFile(config.assets + config.assetsSubpath + '/js/app/app.js',
          "Manager.ready(function() {" + "\n" +
            "  Manager.log('app.js fired Manager.ready()');" + "\n" +
            "" + "\n" +
            "  // Add additional logic here!" + "\n" +
            "  // var theme = require('../theme/theme.js');" + "\n" +
            "" + "\n" +
          "});" + "\n" +
          ""
        )
        
        if (!fs.exists('./pages/index.md') && !fs.exists('./pages/index.html')) {
          const indexTemplate = await readFile('./_websrc/templates/master/placeholder/index.md');
          await createFile('./pages/index.md', indexTemplate)
        }

        if (!fs.exists('./pages/about.md') && !fs.exists('./pages/about.html')) {
          const aboutTemplate = await readFile('./_websrc/templates/master/placeholder/about.md');
          await createFile('./pages/about.md', aboutTemplate)
        }

        if (!fs.exists('./pages/contact.md') && !fs.exists('./pages/contact.html')) {
          const contactTemplate = await readFile('./_websrc/templates/master/placeholder/contact.md');
          await createFile('./pages/contact.md', contactTemplate)
        }

        if (!fs.exists('./pages/legal/terms.md') && !fs.exists('./pages/legal/terms.html')) {
          const termsTemplate = await readFile('./_websrc/templates/master/placeholder/legal/terms.md');
          await createFile('./pages/legal/terms.md', termsTemplate)
        }
        if (!fs.exists('./pages/legal/privacy.md') && !fs.exists('./pages/legal/privacy.html')) {
          const privacyTemplate = await readFile('./_websrc/templates/master/placeholder/legal/privacy.md');
          await createFile('./pages/legal/privacy.md', privacyTemplate)
        }        
        if (!fs.exists('./pages/legal/cookies.md') && !fs.exists('./pages/legal/cookies.html')) {
          const cookiesTemplate = await readFile('./_websrc/templates/master/placeholder/legal/cookies.md');
          await createFile('./pages/legal/cookies.md', cookiesTemplate)
        }  

        await createFile(config.assets + config.assetsSubpath + '/js/app/service-worker.js',
          "// app service-worker.js code" + "\n" +
          "if (typeof log === 'undefined') {" + "\n" +
            "  var log = function() {};" + "\n" +
          "}" + "\n" +
          "log('app service-worker.js loaded: ', self.location.pathname);" + "\n" +
          "" + "\n" +
          "// Note: any importScripts(); are relative to the master-service-worker.js location" + "\n" +
          "// importScripts('../../app/service-worker.js');" + "\n" +
          ''
        )
        await createFile('_websrc/gulp_tasks/app/main.js',
          "const gulp     = require('gulp');" + "\n" +
          "const newer    = require('gulp-newer');" + "\n" +
          "const through  = require('through2');" + "\n" +
          "const argv     = require('yargs').argv;" + "\n" +
          "const fetch    = require('node-fetch');" + "\n" +
          "const tools    = new (require('../../libraries/tools.js'));" + "\n" +
          "" + "\n" +
          "gulp.task('sample', function() {" + "\n" +
            "  // write your first task here!" + "\n" +
            "  // then set up 'watch' tasks in the app.config.js" + "\n" +
          "});" + "\n" +
          ""
        )


        // post
        // const posts = await listFiles('./_posts') || [];

        // if (posts.find(function (name) {
        //   return name.indexOf('example-post') > -1;
        // })) {
        if ((await listFiles('./_posts') || []).length < 2) {
          const now = new Date();
          const postTemplate = await readFile('./_websrc/templates/master/placeholder/blog/example-post.md');
          for (var i = 1; i < 8; i++) {
            await createFile(`./_posts/${now.getFullYear()}-01-0${i}-example-post-${i}.md`,
              postTemplate
                .replace(/{id}/ig, i)
            )
          }
        }

        // await createFile(`blog/index.html`,
        //   '---' + '\n' +
        //   '### ALL PAGES ###' + '\n' +
        //   'layout: master/blog/index' + '\n' +
        //   '---' + '\n'
        // );
        //
        // await createFile(`./blog/authors/index.html`,
        //   '---' + '\n' +
        //   '### ALL PAGES ###' + '\n' +
        //   'layout: master/authors/index' + '\n' +
        //   '---' + '\n'
        // );

        await createFile(`./_authors/samantha.md`, await readFile('./_websrc/templates/master/placeholder/authors/example-author.md'));

        await createFile(`./_websrc/unit_tests/app/test.js`, await readFile('./_websrc/templates/master/tests/test.js'));
        await fs.writeAsync(`./_websrc/generated/common-modules.scss`, generateCommonModules());

        // Create directories that get deleted through git
        fs.dir(`./_includes/app/assets`);
        fs.dir(`./_includes/app/elements`);
        fs.dir(`./_includes/app/global`);
        fs.dir(`./_includes/app/helpers`);
        fs.dir(`./_includes/app/helpers`);
        fs.dir(`./_includes/app/misc`);
        fs.dir(`./_includes/app/modules`);

        fs.dir(`./_layouts/app/blog`);
        fs.dir(`./_layouts/app/global`);

        fs.dir(`./_websrc/templates/app`);

        fs.dir(`./assets/_src/images/favicon`);
        fs.dir(`./assets/_src/images/og`);

        fs.dir(`./assets/_src/sass/theme`);
        fs.dir(`./assets/_src/js/theme`);

        fs.dir(`./assets/_src-uncompiled`);

        fs.dir(`./special/app/feeds`);
        fs.dir(`./special/app/misc`);
        fs.dir(`./special/app/pages`);
        fs.dir(`./special/app/search`);

        fs.dir('./@output/lighthouse');
        fs.remove('./@output/build/build.json');
        await createFile('./@output/build/build.json', build_json);

        // Create the master service worker
        await fs.writeAsync('./special/master/misc/master-service-worker.js',
          (await readFile('./_websrc/templates/master/js/master-service-worker.js')).replace(/{firebase-version}/img,
            require('web-manager/package.json').dependencies.firebase.replace(/\^|~/img, '')
          )
        );

      }

      // only create these files if NOT on template
      if (!tools.isTemplate) {

      }

      // only create these files if IS ON template and IS NOT server
      if (tools.isTemplate && !tools.isServer) {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/js/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/images/blog/.gitignore', gitignore_ph);
        await createFile('./_includes/app/misc/.gitignore', gitignore_ph);
        await createFile('./_includes/app/global/.gitignore', gitignore_ph);
        await createFile('./_websrc/gulp_tasks/app/.gitignore', gitignore_ph);
        // await createFile('./blog/.gitignore', '/index.html'+'\n'+'.gitignore'+'\n');
        // await createFile('./pages/.gitignore', '/index.md'+'\n'+'.gitignore'+'\n');
        await createFile('./pages/.gitignore', `* \n !@reference`);


        // POST
        await createFile('./_posts/.gitignore', gitignore_ph);
        await createFile('./_authors/.gitignore', gitignore_ph);
      }

      // Only for non-server environment
      if (!tools.isServer) {
        await createFile('./@output/build/.gitignore', gitignore_ph);
        await createFile('./special/master/misc/.gitignore', '/master-service-worker.js'+'\n'+'.gitignore'+'\n');
      } else {
        await createFile('./CNAME', new URL(_configYml.url).host);
      }


      // Get analytics
      // await fetch('https://www.googletagmanager.com/gtag/js')
      // .then(async (res) => {
      //   if (res.ok) {
      //     fs.write('./assets/_src/js/master/tracking/google-analytics.js', await res.text())
      //   } else {
      //     throw new Error('Failed to get gtag.js')
      //   }
      // })
      // .catch(e => {
      //   console.error(e);
      //   reject(e);
      //   process.exit(1)
      // })


      Global.set('prefillStatus', 'done');
      return resolve();
    } catch (e) {
      return reject(e)
    }

  });
});

function generateCommonModules() {
  let contents = '';
  if (fs.exists('./node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss')) {
    contents += `
      $fa-font-path: '../webfonts';
      $fa-font-display: swap;
      @import 'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss';
      @import 'node_modules/@fortawesome/fontawesome-free/scss/solid.scss';
    `
  }
  return contents;
}

async function createFile(file, contents) {
  var response = {
    exists: false,
    error: null,
  }
  return new Promise(function(resolve, reject) {
    try {
      if (fs.exists(file)) {
        response.exists = true;
        resolve(response)
      } else {
       fs.write(file, contents);
       response.exists = false;
       resolve(response);
      }
    } catch (e) {
      response.error = e;
      reject(response);
    }
  });
}

// async function dirEmpty(dirname) {
//   return new Promise(function(resolve, reject) {
//     fs.readdirSync(dirname, function(err, files) {
//         if (err) {
//            // some sort of error
//            console.error(err);
//            reject(err);
//         } else {
//           // directory appears to be empty
//           resolve(!files.length);
//         }
//     });
//   });;
// }

async function listFiles(path) {
  return new Promise(function(resolve, reject) {
    // fs.list(path, (err, files) => {
    //   if (err) {
    //     reject(err);
    //   }
    //   resolve(files)
    // });
    resolve(fs.list(path));
  });
}

async function readFile(path) {
  return new Promise(function(resolve, reject) {
    // fs.readFile(path, 'utf8', function(err, contents) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(contents);
    //   }
    // });
    resolve(fs.read(path))
  });
}
