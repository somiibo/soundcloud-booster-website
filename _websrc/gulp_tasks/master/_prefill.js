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
        
        const pages = [
          '404',
          'about',
          'app',
          'blog',
          'careers',
          'contact',
          'download',
          'extension',
          'index',
          'pricing',
          'team',
          'legal/terms',
          'legal/privacy',
          'legal/cookies',
        ]

        pages.forEach(async function(page) {
          await createPageIfNoExist(page);
        });

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
        const totalPosts = (await listFiles('./_posts') || []).length;
        if (totalPosts < 1 || (tools.isTemplate && totalPosts < 7)) {
          const now = new Date();
          const postTemplate = await readFile('./_websrc/templates/master/placeholder/blog/post.md');
          // const postTeaser = await readFile();

          for (var i = 1; i < 8; i++) {
            const postId = Math.round(now.getTime() / 1000) + i;
            const postTitle = `example-post-${i}`;

            await createFile(`./_posts/${now.getFullYear()}-01-0${i}-${postTitle}.md`,
              postTemplate
                .replace(/{id}/ig, postId)
                .replace(/{count}/ig, i)
            )
            await copyFile('./_websrc/templates/master/placeholder/blog/post.jpg', `./assets/_src/images/blog/posts/post-${postId}/${postTitle}.jpg`);
          }
        }

        // await createFile(`blog/index.html`,
        //   '---' + '\n' +
        //   '### ALL PAGES ###' + '\n' +
        //   'layout: master/blog/index' + '\n' +
        //   '---' + '\n'
        // );
        //
        // await createFile(`./team/index.html`,
        //   '---' + '\n' +
        //   '### ALL PAGES ###' + '\n' +
        //   'layout: master/team/index' + '\n' +
        //   '---' + '\n'
        // );

        // Create base team member
        await createFile(`./_team/alex.md`, await readFile('./_websrc/templates/master/placeholder/team/alex.md'));
        await copyFile('./_websrc/templates/master/placeholder/team/alex.jpg', `./assets/_src/images/team/alex/profile.jpg`);

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
      if (!tools.isTemplate) {

      }

      // only create these files if IS ON template and IS NOT server
      if (tools.isTemplate && !tools.isServer) {
        await createFile(config.assets + config.assetsSubpath + '/sass/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/js/app/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/images/blog/.gitignore', gitignore_ph);
        await createFile(config.assets + config.assetsSubpath + '/images/team/.gitignore', gitignore_ph);

        await createFile('./_includes/app/misc/.gitignore', gitignore_ph);
        await createFile('./_includes/app/global/.gitignore', gitignore_ph);
        await createFile('./_websrc/gulp_tasks/app/.gitignore', gitignore_ph);
        await createFile('./pages/.gitignore', `* \n!@reference`);


        // POST
        await createFile('./_posts/.gitignore', gitignore_ph);
        await createFile('./_team/.gitignore', gitignore_ph);
      }

      // Only for non-server environment
      if (!tools.isServer) {
        await createFile('./@output/build/.gitignore', gitignore_ph);
        await createFile('./special/master/misc/.gitignore', '/master-service-worker.js'+'\n'+'.gitignore'+'\n');
      } else {
        await fs.removeAsync('./special/master/pages/@reference')
        await createFile('./CNAME', new URL(_configYml.url).host);
      }

      // if (!tools.isTemplate && tools.isServer) {
      // }

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
  const response = {
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


async function copyFile(from, to) {
  const response = {
    exists: false,
    error: null,
  }

  return new Promise(function(resolve, reject) {
    try {
      if (fs.exists(to)) {
        response.exists = true;
        resolve(response)
      } else {
       fs.copy(from, to);
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

function createPageIfNoExist(page, contentsPath) {
  return new Promise(async function(resolve, reject) {
    const path = `./pages/${page}`;

    if (
      (!fs.exists(`${path}.md`) && !fs.exists(`${path}.html`))
      || tools.isTemplate
    ) {
      const parent = `./_websrc/templates/master/placeholder/${page}`;
      const ext = fs.exists(`${parent}.md`)
        ? '.md'
        : '.html';
      const contents = await readFile(`${parent}${ext}`);

      fs.write(`${path}${ext}`, contents)
    }

    return resolve();
  });
}
