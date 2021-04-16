const through  = require('through2');
const Global   = require('./global.js');

function Tools() {

}

Tools.prototype.startTask = (name, timeout) => {
  const now = new Date();
  timeout = timeout || 2;
  Global.set(`completed.${name}`, new Date(now.setTime(now.getTime() + (timeout * 60 * 1000))));
}

Tools.prototype.completeTask = (name) => {
  Global.set(`completed.${name}`, new Date());

  return through.obj((file, enc, done) => {
    return done(null);
  });
}

Tools.prototype.wait = function (ms) {
  return new Promise(function(resolve, reject) {
    setInterval(function () {
      resolve();
    }, ms || 1);
  });
};

Tools.prototype.poll = function (fn, options) {
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
