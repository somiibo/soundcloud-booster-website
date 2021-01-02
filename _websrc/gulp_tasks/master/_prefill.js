const gulp       = require('gulp');
const fs         = require('fs-jetpack');
const argv       = require('yargs').argv;
const config     = require('../../master.config.js');
const isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;
const isServer   = (argv.buildLocation == 'server');
const _configYml = require('js-yaml').safeLoad(fs.read('_config.yml'));
const Global     = require('../../libraries/global.js');

gulp.task('_prefill', async () => {
  return new Promise(async (resolve, reject) => {

    const gitignore_ph = await readFile('./_websrc/templates/master/gitignore/all');
    const build_json = await readFile('./_websrc/templates/master/output/build/build.json');
    try {

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
          await createFile('./pages/index.md',
            '---' + '\n' +
            '### ALL PAGES ###' + '\n' +
            'layout: master/global/default' + '\n' +
            'permalink: /' + '\n' +
            'sitemap:' + '\n' +
            '  include: false' + '\n' +
            '' + '\n' +
            '### REGULAR PAGES ###' + '\n' +
            'meta:' + '\n' +
            '  title: "Home"' + '\n' +
            '  description: "We are a great company and would love to design an intuitive solution for you!"' + '\n' +
            '  breadcrumb: "Home"' + '\n' +
            '---' + '\n' +
            'This is a wonderful homepage!' +
            ''
          )
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
          "let isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;" + "\n" +
          "let isServer   = (argv.buildLocation == 'server');" + "\n" +
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
          for (var i = 1; i < 8; i++) {
            await createFile(`./_posts/2019-01-0${i}-example-post-${i}.md`,
              '---' + '\n' +
              '### ALL PAGES ###' + '\n' +
              'layout: master/blog/post' + '\n' +
              '' + '\n' +
              '### POST ONLY ###' + '\n' +
              'post:' + '\n' +
                `  title: Example post number ${i}` + '\n' +
                // `  date: 2019-01-0${i}` + '\n' +
                `  excerpt: This is a sample excerpt for post number ${i}` + '\n' +
                `  description: This is a sample excerpt for post number ${i}` + '\n' +
                `  author: samantha` + '\n' +
                `  id: ${i}` + '\n' +
                `  tags: [tag, tag2, tag3]` + '\n' +
                `  categories: [marketing, business]` + '\n' +
                `  affiliate-search-term: Marketing` + '\n' +
              '---' + '\n' +
              '' + '\n' +
              `## Title inside post ${i}` + '\n' +
              'This is a wonderful paragrah inside a post!' + '\n' +
              ''
            )
          }
        }

        await createFile(`blog/index.html`,
          '---' + '\n' +
          '### ALL PAGES ###' + '\n' +
          'layout: master/blog/index' + '\n' +
          '---' + '\n'
        );

        await createFile(`./blog/authors/index.html`,
          '---' + '\n' +
          '### ALL PAGES ###' + '\n' +
          'layout: master/authors/index' + '\n' +
          '---' + '\n'
        );

        await createFile(`./_authors/samantha.md`, await readFile('./_websrc/templates/master/authors/example-author.md'));

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
      }

      // only create these files if NOT on template
      if (!isTemplate) {

      }

      // only create these files if IS ON template and IS NOT server
      if (isTemplate && !isServer) {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/js/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/images/blog/.gitignore', gitignore_ph);
        await createFile('./_includes/app/misc/.gitignore', gitignore_ph);
        await createFile('./_includes/app/global/.gitignore', gitignore_ph);
        await createFile('./_websrc/gulp_tasks/app/.gitignore', gitignore_ph);
        await createFile('./pages/.gitignore', '/index.md'+'\n'+'.gitignore'+'\n');
        await createFile('./blog/.gitignore', '/index.html'+'\n'+'.gitignore'+'\n');

        // POST
        await createFile('./_posts/.gitignore', gitignore_ph);
        await createFile('./_authors/.gitignore', gitignore_ph);
      }

      // Only for non-server environment
      if (!isServer) {
        await createFile('./@output/build/.gitignore', gitignore_ph);
      } else {
        await createFile('./CNAME', new URL(_configYml.url).host);
      }
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
