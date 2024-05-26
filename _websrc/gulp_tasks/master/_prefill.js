const gulp       = require('gulp');
const jetpack    = require('fs-jetpack');
const config     = require('../../master.config.js');
const _configYml = require('js-yaml').load(jetpack.read('_config.yml'));
const del        = require('del');
const tools      = new (require('../../libraries/tools.js'));
const Global     = require('../../libraries/global.js');
const fetch      = require('node-fetch');

gulp.task('_prefill', () => {
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
        await createFile(`${config.assets}${config.assetsSubpath}/sass/app/app.scss`, await readFile('./_websrc/templates/master/css/app-entry.scss'))

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

        await createFile(`${config.assets}${config.assetsSubpath}/js/app/app.js`, await readFile('./_websrc/templates/master/js/app-entry.js'))

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

        // Create app service-worker.js
        await createFile(`${config.assets}${config.assetsSubpath}/js/app/service-worker.js`, await readFile('./_websrc/templates/master/js/app-service-worker.js'));

        // Create app gulp task
        await createFile('_websrc/gulp_tasks/app/main.js', await readFile('./_websrc/templates/master/js/app-gulp-task.js'))

        // Create build-post.js
        await createFile('_websrc/gulp_tasks/app/build-post.js', await readFile('./_websrc/templates/master/js/build-post.js'))

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

        // Create base team member
        await createFile(`./_team/alex.md`, await readFile('./_websrc/templates/master/placeholder/team/alex.md'));
        await copyFile('./_websrc/templates/master/placeholder/team/alex.jpg', `./assets/_src/images/team/alex/profile.jpg`);

        await createFile(`./_websrc/unit_tests/app/test.js`, await readFile('./_websrc/templates/master/tests/test.js'));
        await jetpack.writeAsync(`./_websrc/generated/common-modules.scss`, generateCommonModules());

        // Create directories that get deleted through git
        jetpack.dir(`./_includes/app/assets`);
        jetpack.dir(`./_includes/app/elements`);
        jetpack.dir(`./_includes/app/global`);
        jetpack.dir(`./_includes/app/helpers`);
        jetpack.dir(`./_includes/app/helpers`);
        jetpack.dir(`./_includes/app/misc`);
        jetpack.dir(`./_includes/app/modules`);

        jetpack.dir(`./_layouts/app/blog`);
        jetpack.dir(`./_layouts/app/global`);

        jetpack.dir(`./_websrc/templates/app`);

        jetpack.dir(`./assets/_src/images/favicon`);
        jetpack.dir(`./assets/_src/images/og`);

        jetpack.dir(`./assets/_src/sass/theme`);
        jetpack.dir(`./assets/_src/js/theme`);

        jetpack.dir(`./assets/_src-uncompiled`);

        jetpack.dir(`./special/app/feeds`);
        jetpack.dir(`./special/app/misc`);
        jetpack.dir(`./special/app/pages`);
        jetpack.dir(`./special/app/search`);

        jetpack.dir('./@output/lighthouse');
        jetpack.remove('./@output/build/build.json');

        await createFile('./@output/build/build.json', build_json);
      }

      // only create these files if NOT on template
      if (!tools.isTemplate) {
        // Create settings.json to hide master files
        await createFile(`.vscode/settings.json`, await readFile('./_websrc/templates/master/vscode/settings.json'));

        // Create app blog post layout
        await createFile(`./_layouts/app/blog/post.html`, await readFile('./_websrc/templates/app/placeholder/blog/post.html'));
      }

      // only create these files if IS ON template and IS NOT server
      if (tools.isTemplate && !tools.isServer) {
        await createFile(`${config.assets}${config.assetsSubpath}/sass/app/.gitignore`, gitignore_ph);
        await createFile(`${config.assets}${config.assetsSubpath}/js/app/.gitignore`, gitignore_ph);
        await createFile(`${config.assets}${config.assetsSubpath}/images/blog/.gitignore`, gitignore_ph);
        await createFile(`${config.assets}${config.assetsSubpath}/images/team/.gitignore`, gitignore_ph);

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
        await createFile('./special/master/misc/.gitignore', '/master-service-worker.js\n.gitignore\n');
      } else {
        await jetpack.removeAsync('./special/master/pages/@reference')
        await createFile('./CNAME', new URL(_configYml.url).host);
      }

      // if (!tools.isTemplate && tools.isServer) {
      // }

      // Get analytics
      // await fetch('https://www.googletagmanager.com/gtag/js')
      // .then(async (res) => {
      //   if (res.ok) {
      //     jetpack.write('./assets/_src/js/master/tracking/google-analytics.js', await res.text())
      //   } else {
      //     throw new Error('Failed to get gtag.js')
      //   }
      // })
      // .catch(e => {
      //   console.error(e);
      //   reject(e);
      //   process.exit(1)
      // })

      // Get firebase-auth
      const firebaseAuthFiles = [
        'handler.html',
        'handler.js',
        'experiments.js',
        'iframe.html',
        'iframe.js',
      ]
      const firebaseAuthPrefix = '__/auth';
      const firebaseAuthPromises = [];
      const firebaseAuthDir = './special/master/scripts/firebase-auth';

      // Clear files
      jetpack.remove(firebaseAuthDir);

      if (!tools.isServer) {
        await createFile(`${firebaseAuthDir}/.gitignore`, gitignore_ph);
      }

      for (var i = 0; i < firebaseAuthFiles.length; i++) {
        const file = firebaseAuthFiles[i];
        const fileNoHTML = file.replace('.html', '');
        const remoteFile = `https://ultimate-jekyll.firebaseapp.com/${firebaseAuthPrefix}/${fileNoHTML}`;

        // console.log(`Fetching ${remoteFile}`);

        firebaseAuthPromises.push(
          fetch(remoteFile)
          .then(async (res) => {
            if (res.ok) {
              jetpack.write(`${firebaseAuthDir}/${file}`,
                '---\n'
                + `permalink: /${firebaseAuthPrefix}/${fileNoHTML}\n`
                + '---\n'
                + '\n'
                + await res.text()
              )
            } else {
              throw new Error(`Failed to get ${file}`)
            }
          })
          // .catch(e => {
          //   console.error(e);
          // })
        )
      }

      await Promise.all(firebaseAuthPromises);

      Global.set('prefillStatus', 'done');
      return resolve();
    } catch (e) {
      return reject(e)
    }

  });
});

function generateCommonModules() {
  let contents = '';
  if (jetpack.exists('./node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss')) {
    contents += `
      $fa-font-path: '../webfonts';
      $fa-font-display: swap;
      @import 'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss';
      @import 'node_modules/@fortawesome/fontawesome-free/scss/solid.scss';
    `
  }
  return contents;
}

async function createFile(file, contents, options) {
  const response = {
    exists: false,
  }

  options = options || {};
  options.overwrite = typeof options.overwrite === 'undefined' ? false : options.overwrite;

  return new Promise(function(resolve, reject) {
    try {
      // Check if file exists
      response.exists = jetpack.exists(file);

      // If file exists and force is not true, resolve
      if (response.exists && !options.overwrite) {
        resolve(response)
      } else {
        jetpack.write(file, contents);
        resolve(response);
      }
    } catch (e) {
      reject(e);
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
      if (jetpack.exists(to)) {
        response.exists = true;
        resolve(response)
      } else {
       jetpack.copy(from, to);
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
//     jetpack.readdirSync(dirname, function(err, files) {
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
    // jetpack.list(path, (err, files) => {
    //   if (err) {
    //     reject(err);
    //   }
    //   resolve(files)
    // });
    resolve(jetpack.list(path));
  });
}

async function readFile(path) {
  return new Promise(function(resolve, reject) {
    // jetpack.readFile(path, 'utf8', function(err, contents) {
    //   if (err) {
    //     reject(err);
    //   } else {
    //     resolve(contents);
    //   }
    // });
    resolve(jetpack.read(path))
  });
}

function createPageIfNoExist(page, contentsPath) {
  return new Promise(async function(resolve, reject) {
    const path = `./pages/${page}`;

    if (
      (!jetpack.exists(`${path}.md`) && !jetpack.exists(`${path}.html`))
      || tools.isTemplate
    ) {
      const parent = `./_websrc/templates/master/placeholder/${page}`;
      const ext = jetpack.exists(`${parent}.md`)
        ? '.md'
        : '.html';
      const contents = await readFile(`${parent}${ext}`);

      jetpack.write(`${path}${ext}`, contents)
    }

    return resolve();
  });
}
