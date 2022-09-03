const through  = require('through2');
const Global   = require('./global.js');
const argv     = require('yargs').argv;

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
  // self.log('Starting...')
  Global.set(`completed.${name}`, new Date(now.setTime(now.getTime() + (timeout * 60 * 1000))));
}

Tools.prototype.completeTask = function(name) {
  const self = this;
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

module.exports = Tools;
