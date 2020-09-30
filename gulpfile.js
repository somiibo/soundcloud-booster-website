'use strict';

const config     = require('./_websrc/master.config.js');
const gulp       = require('gulp');
const requireDir = require('require-dir');
const argv       = require('yargs').argv;
const tasks = [];

requireDir('./_websrc/gulp_tasks', {recurse: true});

// Log important stuff
console.log('Using Node.js v', process.versions.node);
console.log('Command line args => ', argv);

Object.keys(config.tasks).forEach(function (key) {
  if (config.tasks[key] && key !== 'eslint') {
    tasks.push((key === 'webpack' && config.tasks.watch) ? '_' + key : key);
  }
});

/**
 * Default task, running just `gulp` will minify the images,
 * compile the sass, bundle the js, launch BrowserSync, and
 * watch files.
 */
gulp.task('default', tasks);
