const config      = require('../../master.config.js');
const gulp        = require('gulp');
const argv        = require('yargs').argv;
const querystring = require('querystring');
const fetch       = require('node-fetch');
const Poster      = require('ultimate-jekyll-poster');

const fs = require('fs-jetpack');

function Post() {

}

Post.prototype.create = async function (options) {
  options = options || {};
  let req = options.req;
  let res = options.res;
  let response = {
    status: 200,
    data: {

    }
  }
  const { headers, method, url } = req;
  let body = [];
  let parsedBody = {}

  return new Promise(function(resolve, reject) {

    req.on('data', function(chunk) {
      body.push(chunk.toString());
    });

    req.on('end', async function() {
      body = body.join('');
      parsedBody = JSON.parse(body);
      let poster = new Poster({
        environment: 'development'
      });

      console.log('Creating post...', parsedBody);

      // Save to disk OR commit
      poster.onDownload = function (meta) {
        return new Promise(async function(resolve, reject) {
          poster.saveImage(meta.finalPath)
            .then(() => {resolve()})
            .catch((e) => {reject(e)})
        });
      }

      let finalPost = await poster.create(parsedBody)
      .catch(function (e) {
        response.status = 500;
        response.error = e.toString();
      })

      // Save post OR commit
      // fs.write(finalPost.path, finalPost.content)

      res.on('error', (err) => {
        console.error(err);
        response.status = 500;
        response.error = err.toString();
      });

      if (response.status === 200) {
        poster.write(finalPost.path, finalPost.content);
        response.data = finalPost;
      }

      res.statusCode = response.status;
      res.setHeader('Content-Type', 'application/json');

      const responseBody = { headers, method, url, body };

      if (response.status >= 200 && response.status <= 299) {
        res.write(JSON.stringify(response.data));
      } else {
        res.write(response.error);
      }
      return resolve(res.end());
    });
  });

};

module.exports = Post;
