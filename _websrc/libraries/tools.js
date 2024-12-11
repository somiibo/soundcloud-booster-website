const through  = require('through2');
const Global   = require('./global.js');
const argv     = require('yargs').argv;
const { exec, spawn } = require('child_process');

function Tools() {
  const self = this;
  self.isTemplate = __dirname.indexOf('/ultimate-jekyll/') > -1;
  self.isServer = argv.buildLocation === 'server';
  self.task = 'unknown';
  return self;
}

Tools.prototype.startTask = function(name, timeout) {
  const self = this;
  const now = new Date();
  timeout = timeout || 2;
  self.task = name;

  // Log starting task
  console.log(`[${name}] Task starting...`);

  // Set the task as completed in the future
  Global.set(`completed.${name}`, new Date(now.setTime(now.getTime() + (timeout * 60 * 1000))));
}

Tools.prototype.completeTask = function(name) {
  const self = this;

  // Log completion
  console.log(`[${name}] Task completed!`);

  // Set the task as completed now
  Global.set(`completed.${name}`, new Date());

  return through.obj((file, enc, done) => {
    return done(null);
  });
}

Tools.prototype.wait = function(ms) {
  const self = this;
  return new Promise(function(resolve, reject) {
    setInterval(function () {
      resolve();
    }, ms || 1);
  });
};

Tools.prototype.log = function() {
  const self = this;
  console.log(`[${self.task || 'unknown'}]`, ...arguments);
};

Tools.prototype.error = function () {
  const self = this;
  console.error(`[${self.task || 'unknown'}] ERROR:`, ...arguments);
};

Tools.prototype.poll = function(fn, options) {
  const self = this;
  options = options || {};
  var endTime = Number(new Date()) + (options.timeout || 2000);
  options.interval = options.interval || 100;

  return new Promise(function(resolve, reject) {
    (function p() {
      // If the condition is met, we're done!
      if (fn()) {
        // callback();
        resolve();
      }
      // If the condition isn't met but the timeout hasn't elapsed, go again
      else if (Number(new Date()) < endTime) {
        // console.log('polling...');
        setTimeout(p, options.interval);
      }
      // Didn't match and too much time, reject!
      else {
        reject(new Error('timed out for ' + fn + ': ' + arguments));
      }
    })();
  });
}

Tools.prototype.execute = function (cmd) {
  const self = this;

  return new Promise(function(resolve, reject) {
    exec(cmd, (e, stdout, stderr) => {
      if (e) {
        return reject(e);
      }

      return resolve(stdout.trim());
    });
  });
};

Tools.prototype.spawn = function (cmd, args) {
  const self = this;

  return new Promise(function(resolve, reject) {
    cp.spawn(cmd, args, {stdio: 'inherit', env: process.env})
      .on('close', resolve)
      .on('error', reject);
  });
};

Tools.prototype.getCurrentBranch = function () {
  const self = this;

  return self.execute('git symbolic-ref --short HEAD');
};

Tools.prototype.quitIfBadBuildEnvironment = function () {
  const self = this;

  return new Promise(async function(resolve, reject) {
    const result = (await self.getCurrentBranch()) === 'template' && !self.isTemplate;

    if (result) {
      // console.error('⛔️ Quitting because this is the template branch and we are working on a child project of the template.');
      console.error('⛔️ Branch change detected! Quitting safely...');

      process.exit(1);
    }

    return resolve(result);
  });
};

module.exports = Tools;
