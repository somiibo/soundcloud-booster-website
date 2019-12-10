const config   = require('../../master.config.js');
const gulp     = require('gulp');
const argv     = require('yargs').argv;
const querystring     = require('querystring');
const request     = require('request');

// const jsonminify = require("jsonminify");
const fs = require("fs-jetpack");

let template =
`
---
### ALL PAGES ###
layout: {{layout}}

### POST ONLY ###
post:
  title: {{title}}
  excerpt: {{excerpt}}
  description: {{description}}
  author: {{author}}
  id: {{id}}
  tags: {{tags}}
  categories: {{categories}}
  affiliate-search-term: {{affiliate}}
---
{{body}}
`

let imgTemplate = `{%- include /master/helpers/image.html src="{{url}}" alt="{{alt}}" -%}`;

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
  // res.write(JSON.stringify({test: 'penis'}));
  // return res.end();

  const { headers, method, url } = req;
  let body = [];
  console.log('Creating post...');

  return new Promise(function(resolve, reject) {
    // res.write(JSON.stringify({test: 'penis'}));
    // return resolve(res.end());

    req.on('data', function(chunk) {
      body.push(chunk.toString());
    });
    req.on('end', async function() {
      body = body.join('');
      await createPost(JSON.parse(body));

      res.on('error', (err) => {
        console.error(err);
      });

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      // Note: the 2 lines above could be replaced with this next one:
      // response.writeHead(200, {'Content-Type': 'application/json'})

      const responseBody = { headers, method, url, body };

      res.write(JSON.stringify(response));
      return resolve(res.end());
      // Note: the 2 lines above could be replaced with this next one:
      // response.end(JSON.stringify(responseBody))

      // END OF NEW STUFF

    });
  });

};

function createPost(body) {
  return new Promise(async function(resolve, reject) {
    // body = querystring.parse(body);
    let keys = Object.keys(body);
    let images = [];
    let imagesMatrix = [];
    let links = [];
    let linksMatrix = [];
    let content = template;
    let imageSavePath = `./assets/_src/images/blog/posts/post-${body.id}/`;
    let imageSavePathReg = `/assets/images/blog/posts/post-${body.id}/`;
    body.replaceImagesIncludeTag = body.replaceImagesIncludeTag || imgTemplate;
    for (var i = 0; i < keys.length; i++) {
      // console.log('-------->replacing',[keys[i]], 'with', body[keys[i]]);
      content = content.replace(`{{${[keys[i]]}}}`, body[keys[i]]);
    }
    images = content.match(/(?:!\[(.*?)\]\((.*?)\))/img) || [];
    links = content.match(/(?:\[(.*?)\]\((.*?)\))/img) || [];
    // Images
    for (var i = 0; i < images.length; i++) {
      let alt = ((images[i].match(/\[(.*?)\]/img)|| [])[0]+'').replace(/(\[|\])/img, '');
      let title = ((images[i].match(/\((.*?)\)/img)|| [])[0]+'').replace(/(\(|\))/img, '');
      let link = title.replace(/\s.*?"(.*?)"\s*/g,'');
      let different = (title != link);
      // let newLink = (alt.replace(/\s/g, '-') + '.jpg').toLowerCase();
      let newLink = (alt.trim().replace(/\s/g, '-') + '').toLowerCase();
      imagesMatrix.push({
        alt: alt,
        link: link,
        newLink: newLink,
      })

      let curSavePath = `${imageSavePath}${newLink}`;
      await download(link, `${imageSavePath}${newLink}`)
      .then(function (result) {
        console.log('Saved image to ', curSavePath, result);
        let tempPrePath = (body.includeLocalImagePath ? imageSavePathReg : '');
        let lookForLink = different ? title : link;
        if (body.enableReplaceImagesMarkdown) {
          content = content.replace(`![${alt}](${lookForLink})`, body.replaceImagesIncludeTag.replace('{{url}}', tempPrePath + newLink + result.extension).replace('{{alt}}', alt))
        } else {
          content = content.replace(`![${alt}](${lookForLink})`, `![${alt}](${tempPrePath + newLink + result.extension})`)
        }
      })
    }
    // Links
    for (var i = 0; i < links.length; i++) {
      if (content.indexOf('!' + links[i]) == -1) {
        let alt = ((links[i].match(/\[(.*?)\]/img)|| [])[0]+'').replace(/(\[|\])/img, '');
        let link = ((links[i].match(/\((.*?)\)/img)|| [])[0]+'').replace(/(\(|\))/img, '').replace(/\s.*?"(.*?)"\s*/g,'');
        let newLink = false;
        let needsReplacing = link.indexOf('url?q=') != -1;
        if (needsReplacing) {
          newLink = (querystring.parse(link.split('?')[1]).q)
        }
        linksMatrix.push({
          alt: alt,
          link: link,
          newLink: newLink,
        });
        if (needsReplacing) {
          content = content.replace(`[${alt}](${link})`, `[${alt}](${newLink})`)
        }
      }
    }
    console.log('imagesMatrix', imagesMatrix);
    console.log('linksMatrix', linksMatrix);
    console.log('final content', content);

    // Trim and add final line at bottom
    content = `${content.trim()}\n`;

    // Save post
    let postPath = `${body.path}/${body.date}-${body.url}.md`.replace(/\/\//g, '/');
    console.log('Saving to....', postPath);
    fs.write(postPath, content)

    resolve();
  });
}


var download = function(uri, filename, callback){
  return new Promise(function(resolve, reject) {
    let meta = {};
    request.head(uri, function(err, res, body){
      meta['content-type'] = res.headers['content-type'];
      meta['content-length'] = res.headers['content-length'];
      meta.extension = '';
      if (meta['content-type'].indexOf('png') != -1) {
        meta.extension = '.png'
      } else if (meta['content-type'].indexOf('jpg') != -1) {
        meta.extension = '.jpg'
      } else if (meta['content-type'].indexOf('jpeg') != -1) {
        // meta.extension = '.jpeg'
        meta.extension = '.jpg'
      }

      let dir = filename.split('/');
      dir.pop();
      dir = dir.join('/');
      fs.dir(dir);
      request(uri).pipe(fs.createWriteStream(filename + meta.extension)).on('close', function () {
        // callback(meta);
        resolve(meta);
      });
    });
  });;
};



module.exports = Post;
